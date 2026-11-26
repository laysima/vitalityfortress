import WorkoutLogger from "@/components/app/WorkoutLogger";
import { programBySlug } from "@/lib/catalog";
import { getWorkouts } from "@/lib/dal";
import { freshExercise, previousSets } from "@/lib/logger";

export const metadata = { title: "Log a workout" };

export default async function NewWorkoutPage({ searchParams }) {
  const params = await searchParams;
  const workouts = await getWorkouts();
  const previous = previousSets(workouts);

  const program = programBySlug[params.program];
  const dayIndex = Number.parseInt(params.day ?? "0", 10);
  const day = program?.days[Number.isInteger(dayIndex) ? dayIndex : 0];

  const initial = {
    name: day ? `${program.name} · ${day.name}` : "Free session",
    programSlug: day ? program.slug : null,
    programDay: day ? program.days.indexOf(day) : null,
    startedAt: new Date().toISOString(),
    notes: "",
    exercises: day ? day.exercises.map((e) => freshExercise(e.slug, e, previous[e.slug])) : [],
  };

  return <WorkoutLogger initial={initial} previous={previous} />;
}
