"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { exerciseBySlug, programBySlug } from "@/lib/catalog";
import { verifySession } from "@/lib/dal";
import { getDb } from "@/lib/db";
import { buildSampleWorkouts } from "@/lib/sample";
import { workoutVolume } from "@/lib/stats";

const SetSchema = z.object({
  reps: z.coerce.number().min(0).max(1000),
  weight: z.coerce.number().min(0).max(1000),
  done: z.boolean(),
});

const WorkoutSchema = z.object({
  name: z.string().trim().min(1).max(80),
  programSlug: z.string().nullable().optional(),
  programDay: z.number().int().min(0).max(10).nullable().optional(),
  startedAt: z.iso.datetime(),
  notes: z.string().max(1000).optional().default(""),
  exercises: z
    .array(
      z.object({
        slug: z.string().refine((s) => Boolean(exerciseBySlug[s]), { error: "Unknown exercise." }),
        sets: z.array(SetSchema).max(30),
      })
    )
    .max(30),
});

export async function saveWorkout(payload) {
  const { userId } = await verifySession();
  const parsed = WorkoutSchema.safeParse(payload);
  if (!parsed.success) return { error: "This workout couldn't be saved. Check the sets and try again." };

  const data = parsed.data;
  const exercises = data.exercises
    .map((ex) => ({ slug: ex.slug, name: exerciseBySlug[ex.slug].name, sets: ex.sets.filter((s) => s.done) }))
    .filter((ex) => ex.sets.length > 0);
  if (!exercises.length) return { error: "Complete at least one set before finishing." };

  const finishedAt = new Date();
  const startedAt = new Date(data.startedAt);
  const durationSec = Math.min(6 * 3600, Math.max(60, Math.round((finishedAt - startedAt) / 1000)));

  const db = await getDb();
  const { insertedId } = await db.collection("workouts").insertOne({
    userId,
    name: data.name,
    programSlug: data.programSlug && programBySlug[data.programSlug] ? data.programSlug : null,
    startedAt,
    finishedAt,
    durationSec,
    notes: data.notes,
    exercises,
    volume: workoutVolume(exercises),
  });

  // Advance the member's program to the next session.
  const program = data.programSlug ? programBySlug[data.programSlug] : null;
  if (program && data.programDay != null) {
    await db.collection("users").updateOne(
      { _id: userId, "activeProgram.slug": program.slug },
      {
        $set: { "activeProgram.nextDay": (data.programDay + 1) % program.days.length },
        $inc: { "activeProgram.completed": 1 },
      }
    );
  }

  revalidatePath("/", "layout");
  return { id: insertedId.toString() };
}

export async function deleteWorkout(id) {
  const { userId } = await verifySession();
  if (!ObjectId.isValid(id)) return { error: "Workout not found." };
  const db = await getDb();
  await db.collection("workouts").deleteOne({ _id: new ObjectId(id), userId });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function loadSampleHistory() {
  const { userId } = await verifySession();
  const db = await getDb();
  const existing = await db.collection("workouts").countDocuments({ userId });
  if (existing > 0) return { error: "Sample history is only available on an empty log." };
  const docs = buildSampleWorkouts(userId);
  await db.collection("workouts").insertMany(docs);
  revalidatePath("/", "layout");
  return { count: docs.length };
}
