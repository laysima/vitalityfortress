import { exerciseBySlug } from "@/lib/catalog";

// Builds logger state. Shared by the server page (initial plan) and the client logger.

let uid = 0;
export const makeKey = () => `k${Date.now().toString(36)}${(uid += 1).toString(36)}`;

export function freshExercise(slug, { sets = 3, reps = 8, rest = 90 } = {}, last) {
  const tracksWeight = exerciseBySlug[slug]?.tracksWeight;
  return {
    key: makeKey(),
    slug,
    rest,
    sets: Array.from({ length: sets }, (_, i) => ({
      key: makeKey(),
      weight: tracksWeight ? (last?.[i]?.weight ?? last?.at(-1)?.weight ?? "") : 0,
      reps,
      done: false,
    })),
  };
}

// Most recent completed sets for every exercise the member has logged.
export function previousSets(workouts) {
  const out = {};
  for (const w of workouts) {
    for (const ex of w.exercises) {
      if (!out[ex.slug]) out[ex.slug] = ex.sets.map((s) => ({ weight: s.weight, reps: s.reps }));
    }
  }
  return out;
}
