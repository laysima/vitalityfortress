import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { decrypt, SESSION_COOKIE } from "@/lib/session";

// Data Access Layer: every member page and Server Action authorizes through here.

export const verifySession = cache(async () => {
  const store = await cookies();
  const session = await decrypt(store.get(SESSION_COOKIE)?.value);
  if (!session?.userId || !ObjectId.isValid(session.userId)) {
    redirect("/login");
  }
  return { userId: new ObjectId(session.userId) };
});

export const getUser = cache(async () => {
  const { userId } = await verifySession();
  const db = await getDb();
  const user = await db
    .collection("users")
    .findOne({ _id: userId }, { projection: { passwordHash: 0 } });
  if (!user) redirect("/login");
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    weeklyGoal: user.weeklyGoal ?? 3,
    activeProgram: user.activeProgram ?? null,
    createdAt: user.createdAt,
  };
});

export function serializeWorkout(doc) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    programSlug: doc.programSlug ?? null,
    startedAt: doc.startedAt.toISOString(),
    finishedAt: doc.finishedAt.toISOString(),
    durationSec: doc.durationSec,
    volume: doc.volume,
    notes: doc.notes ?? "",
    exercises: doc.exercises,
  };
}

export const getWorkouts = cache(async (limit = 0) => {
  const { userId } = await verifySession();
  const db = await getDb();
  const cursor = db.collection("workouts").find({ userId }).sort({ finishedAt: -1 });
  if (limit) cursor.limit(limit);
  const docs = await cursor.toArray();
  return docs.map(serializeWorkout);
});

export const getBookings = cache(async () => {
  const { userId } = await verifySession();
  const db = await getDb();
  const docs = await db
    .collection("bookings")
    .find({ userId, startsAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } })
    .sort({ startsAt: 1 })
    .toArray();
  return docs.map((d) => ({ classId: d.classId, startsAt: d.startsAt.toISOString() }));
});
