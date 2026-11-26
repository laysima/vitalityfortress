import ClassSchedule from "@/components/app/ClassSchedule";
import PageHeader from "@/components/app/PageHeader";
import { getBookings, verifySession } from "@/lib/dal";
import { getDb } from "@/lib/db";
import { occurrencesForDay, upcomingDays } from "@/lib/schedule";

export const metadata = { title: "Classes" };

export default async function ClassesPage() {
  await verifySession();
  const now = new Date();
  const days = upcomingDays(now).map((day) => ({ ...day, classes: occurrencesForDay(day, now) }));
  const ids = days.flatMap((d) => d.classes.map((c) => c.id));

  const [db, bookings] = await Promise.all([getDb(), getBookings()]);
  const counts = await db.collection("classCounts").find({ _id: { $in: ids } }).toArray();
  const booked = Object.fromEntries(counts.map((c) => [c._id, c.booked]));
  const mine = bookings.map((b) => b.classId);

  return (
    <>
      <PageHeader kicker="Next 7 days" title="Classes" />
      <ClassSchedule days={days} booked={booked} mine={mine} />
    </>
  );
}
