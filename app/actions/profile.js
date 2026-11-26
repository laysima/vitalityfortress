"use server";

import { revalidatePath } from "next/cache";
import { programBySlug } from "@/lib/catalog";
import { verifySession } from "@/lib/dal";
import { getDb } from "@/lib/db";

export async function startProgram(slug) {
  const { userId } = await verifySession();
  if (!programBySlug[slug]) return { error: "Program not found." };
  const db = await getDb();
  await db.collection("users").updateOne(
    { _id: userId },
    { $set: { activeProgram: { slug, startedAt: new Date(), nextDay: 0, completed: 0 } } }
  );
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function leaveProgram() {
  const { userId } = await verifySession();
  const db = await getDb();
  await db.collection("users").updateOne({ _id: userId }, { $set: { activeProgram: null } });
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setWeeklyGoal(goal) {
  const { userId } = await verifySession();
  const n = Number(goal);
  if (!Number.isInteger(n) || n < 1 || n > 7) return { error: "Pick between 1 and 7 sessions." };
  const db = await getDb();
  await db.collection("users").updateOne({ _id: userId }, { $set: { weeklyGoal: n } });
  revalidatePath("/", "layout");
  return { ok: true };
}
