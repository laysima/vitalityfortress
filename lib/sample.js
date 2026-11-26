import "server-only";
import { exerciseBySlug, programBySlug } from "@/lib/catalog";
import { workoutVolume } from "@/lib/stats";

// Six weeks of believable, progressing history so a new member can explore
// the dashboard and progress charts before logging their own sessions.

const START_WEIGHTS = {
  "back-squat": 60, "bench-press": 45, "overhead-press": 30, "deadlift": 80, "barbell-row": 40,
  "front-squat": 45, "romanian-deadlift": 50, "kettlebell-swing": 16, "farmers-carry": 20, "walking-lunge": 12,
};
const WEEKLY_JUMP = { "back-squat": 2.5, "bench-press": 1.25, "overhead-press": 1, "deadlift": 5, "front-squat": 2.5, "romanian-deadlift": 2.5, "barbell-row": 1.25 };
const round = (n, step = 1.25) => Math.round(n / step) * step;

export function buildSampleWorkouts(userId, now = new Date()) {
  const strength = programBySlug["base-strength"];
  const engine = programBySlug.engine;
  const docs = [];
  const weeks = 6;

  for (let week = 0; week < weeks; week += 1) {
    // Mon / Wed / Fri strength, plus a Saturday engine session most weeks.
    const sessions = [
      { offset: 0, program: strength, day: 0 },
      { offset: 2, program: strength, day: 1 },
      { offset: 4, program: strength, day: 2 },
    ];
    if (week % 3 !== 1) sessions.push({ offset: 5, program: engine, day: week % engine.days.length });

    for (const s of sessions) {
      const date = new Date(now);
      date.setDate(now.getDate() - (weeks - week) * 7 + s.offset);
      date.setHours(7 + (s.offset % 3) * 5, 10, 0, 0);
      if (date > now) continue;

      const day = s.program.days[s.day];
      const exercises = day.exercises.map((item) => {
        const meta = exerciseBySlug[item.slug];
        const base = START_WEIGHTS[item.slug] ?? 0;
        const weight = meta.tracksWeight ? round(base + (WEEKLY_JUMP[item.slug] ?? 0.5) * week) : 0;
        return {
          slug: item.slug,
          name: meta.name,
          sets: Array.from({ length: item.sets }, (_, i) => ({
            reps: i === item.sets - 1 && week === 3 ? Math.max(1, item.reps - 1) : item.reps,
            weight,
            done: true,
          })),
        };
      });

      const durationSec = (40 + day.exercises.length * 9 + (week % 2) * 6) * 60;
      const finishedAt = new Date(date.getTime() + durationSec * 1000);
      docs.push({
        userId,
        name: `${s.program.name} · ${day.name}`,
        programSlug: s.program.slug,
        startedAt: date,
        finishedAt,
        durationSec,
        notes: "",
        exercises,
        volume: workoutVolume(exercises),
        sample: true,
      });
    }
  }
  return docs;
}
