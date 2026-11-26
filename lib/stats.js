import { exerciseBySlug } from "@/lib/catalog";

// Pure training math, shared by the server pages and the client logger.

export function setVolume(set) {
  if (!set.done) return 0;
  return (Number(set.weight) || 0) * (Number(set.reps) || 0);
}

export function workoutVolume(exercises) {
  return Math.round(
    exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, set) => s + setVolume(set), 0), 0)
  );
}

export function completedSets(exercises) {
  return exercises.reduce((sum, ex) => sum + ex.sets.filter((s) => s.done).length, 0);
}

// Epley estimated one-rep max. Only meaningful for loaded sets of 1–12 reps.
export function estimate1RM(weight, reps) {
  if (!weight || !reps || reps > 12) return 0;
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

export function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const weekday = (d.getDay() + 6) % 7; // Monday start
  d.setDate(d.getDate() - weekday);
  return d;
}

export function weeklyBuckets(workouts, weeks = 8, now = new Date()) {
  const thisWeek = startOfWeek(now);
  const buckets = [];
  for (let i = weeks - 1; i >= 0; i -= 1) {
    const start = new Date(thisWeek);
    start.setDate(thisWeek.getDate() - i * 7);
    buckets.push({ start, sessions: 0, volume: 0, minutes: 0 });
  }
  for (const w of workouts) {
    const ws = startOfWeek(new Date(w.finishedAt)).getTime();
    const bucket = buckets.find((b) => b.start.getTime() === ws);
    if (bucket) {
      bucket.sessions += 1;
      bucket.volume += w.volume;
      bucket.minutes += Math.round(w.durationSec / 60);
    }
  }
  return buckets.map((b) => ({
    ...b,
    label: b.start.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    start: b.start.toISOString(),
  }));
}

// Consecutive weeks (ending this week or last week) with at least one session.
export function weekStreak(workouts, now = new Date()) {
  if (!workouts.length) return 0;
  const weeks = new Set(workouts.map((w) => startOfWeek(new Date(w.finishedAt)).getTime()));
  let cursor = startOfWeek(now);
  if (!weeks.has(cursor.getTime())) cursor.setDate(cursor.getDate() - 7);
  let streak = 0;
  while (weeks.has(cursor.getTime())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 7);
  }
  return streak;
}

export function personalRecords(workouts) {
  const best = new Map();
  for (const w of workouts) {
    for (const ex of w.exercises) {
      const meta = exerciseBySlug[ex.slug];
      if (!meta?.tracksWeight) continue;
      for (const set of ex.sets) {
        if (!set.done) continue;
        const e1rm = estimate1RM(Number(set.weight), Number(set.reps));
        if (!e1rm) continue;
        const current = best.get(ex.slug);
        if (!current || e1rm > current.e1rm) {
          best.set(ex.slug, {
            slug: ex.slug,
            name: meta.name,
            e1rm,
            weight: Number(set.weight),
            reps: Number(set.reps),
            date: w.finishedAt,
          });
        }
      }
    }
  }
  return [...best.values()].sort((a, b) => b.e1rm - a.e1rm);
}

// Best estimated 1RM per session for one exercise, oldest first.
export function liftHistory(workouts, slug) {
  const points = [];
  for (const w of workouts) {
    const ex = w.exercises.find((e) => e.slug === slug);
    if (!ex) continue;
    const top = Math.max(0, ...ex.sets.filter((s) => s.done).map((s) => estimate1RM(Number(s.weight), Number(s.reps))));
    if (top > 0) points.push({ date: w.finishedAt, value: Math.round(top * 10) / 10 });
  }
  return points.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function trackedLifts(workouts) {
  const counts = new Map();
  for (const w of workouts) {
    for (const ex of w.exercises) {
      if (exerciseBySlug[ex.slug]?.tracksWeight && ex.sets.some((s) => s.done && s.weight > 0)) {
        counts.set(ex.slug, (counts.get(ex.slug) ?? 0) + 1);
      }
    }
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => ({ slug, name: exerciseBySlug[slug].name }));
}

// New PRs set in `workout` compared with everything before it.
export function prsInWorkout(workout, previous) {
  const before = new Map(personalRecords(previous).map((p) => [p.slug, p.e1rm]));
  return personalRecords([workout]).filter((p) => p.e1rm > (before.get(p.slug) ?? 0) && before.has(p.slug));
}
