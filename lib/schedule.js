import { classTemplateById, classTemplates, coachBySlug } from "@/lib/catalog";

// Class times are club-local wall-clock times. Dates are handled as YYYY-MM-DD strings
// so a 06:30 class always reads 06:30 regardless of the server's timezone.

export const BOOKING_WINDOW_DAYS = 7;

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Monday = 0 … Sunday = 6
function weekdayOf(date) {
  return (date.getDay() + 6) % 7;
}

export function occurrenceStart(dateKey, time) {
  const [hh, mm] = time.split(":").map(Number);
  const date = fromDateKey(dateKey);
  date.setHours(hh, mm, 0, 0);
  return date;
}

export function makeClassId(templateId, dateKey) {
  return `${templateId}@${dateKey}`;
}

export function parseClassId(classId) {
  if (typeof classId !== "string") return null;
  const [templateId, dateKey] = classId.split("@");
  const template = classTemplateById[templateId];
  if (!template || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey ?? "")) return null;
  if (weekdayOf(fromDateKey(dateKey)) !== template.weekday) return null;
  return { template, dateKey, startsAt: occurrenceStart(dateKey, template.time) };
}

export function upcomingDays(now = new Date(), count = BOOKING_WINDOW_DAYS) {
  const days = [];
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; i < count; i += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    days.push({
      key: toDateKey(date),
      weekday: weekdayOf(date),
      label: date.toLocaleDateString("en-GB", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-GB", { month: "short" }),
      isToday: i === 0,
    });
  }
  return days;
}

export function occurrencesForDay(day, now = new Date()) {
  return classTemplates
    .filter((t) => t.weekday === day.weekday)
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((t) => {
      const startsAt = occurrenceStart(day.key, t.time);
      return {
        id: makeClassId(t.id, day.key),
        templateId: t.id,
        dateKey: day.key,
        title: t.title,
        time: t.time,
        minutes: t.minutes,
        capacity: t.capacity,
        level: t.level,
        room: t.room,
        coach: coachBySlug[t.coach],
        startsAt: startsAt.toISOString(),
        isPast: startsAt.getTime() < now.getTime(),
      };
    });
}

export function isBookable(parsed, now = new Date()) {
  if (!parsed) return false;
  const horizon = new Date(now);
  horizon.setDate(horizon.getDate() + BOOKING_WINDOW_DAYS);
  return parsed.startsAt.getTime() > now.getTime() && parsed.startsAt.getTime() < horizon.getTime();
}

export function endTime(time, minutes) {
  const [hh, mm] = time.split(":").map(Number);
  const total = hh * 60 + mm + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
