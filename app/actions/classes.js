"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/dal";
import { getDb } from "@/lib/db";
import { isBookable, parseClassId } from "@/lib/schedule";

// Capacity is enforced atomically with a per-class counter document:
// the conditional upsert only matches while booked < capacity, and once the
// class is full the upsert collides on _id, so two members can't take the last spot.

export async function bookClass(classId) {
  const { userId } = await verifySession();
  const parsed = parseClassId(classId);
  if (!isBookable(parsed)) return { error: "This class can't be booked." };

  const db = await getDb();
  const bookings = db.collection("bookings");

  try {
    await bookings.insertOne({ userId, classId, templateId: parsed.template.id, startsAt: parsed.startsAt, createdAt: new Date() });
  } catch (error) {
    if (error?.code === 11000) return { error: "You're already booked into this class." };
    throw error;
  }

  try {
    await db.collection("classCounts").updateOne(
      { _id: classId, booked: { $lt: parsed.template.capacity } },
      { $inc: { booked: 1 } },
      { upsert: true }
    );
  } catch (error) {
    await bookings.deleteOne({ userId, classId });
    if (error?.code === 11000) return { error: "Sorry, that class just filled up." };
    throw error;
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function cancelBooking(classId) {
  const { userId } = await verifySession();
  const parsed = parseClassId(classId);
  if (!parsed) return { error: "Booking not found." };

  const db = await getDb();
  const { deletedCount } = await db.collection("bookings").deleteOne({ userId, classId });
  if (deletedCount) {
    await db.collection("classCounts").updateOne({ _id: classId, booked: { $gt: 0 } }, { $inc: { booked: -1 } });
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
