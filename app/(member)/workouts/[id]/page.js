import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import DeleteWorkoutButton from "@/components/app/DeleteWorkoutButton";
import { button, card } from "@/components/ui/styles";
import { exerciseBySlug } from "@/lib/catalog";
import { getWorkouts } from "@/lib/dal";
import { formatDay, formatDuration, formatNumber, formatWeight } from "@/lib/format";
import { completedSets, estimate1RM, prsInWorkout } from "@/lib/stats";

export const metadata = { title: "Workout" };

export default async function WorkoutPage({ params, searchParams }) {
  const [{ id }, { done }] = await Promise.all([params, searchParams]);
  if (!ObjectId.isValid(id)) notFound();

  const workouts = await getWorkouts();
  const index = workouts.findIndex((w) => w.id === id);
  if (index === -1) notFound();
  const workout = workouts[index];
  const prs = prsInWorkout(workout, workouts.slice(index + 1));
  const justFinished = Boolean(done);

  return (
    <div className="space-y-6">
      {justFinished ? (
        // A rare, earned moment — allowed a little more motion than the rest of the app.
        <section className="animate-[enter_500ms_var(--ease-out)_both] rounded-(--radius-card) bg-signal p-6 text-ink md:p-8">
          <p className="eyebrow">Session complete</p>
          <p className="display mt-3 text-6xl md:text-8xl">Work done.</p>
          {prs.length ? (
            <p className="mt-4 text-lg">
              {prs.length === 1 ? "New personal record" : `${prs.length} new personal records`}:{" "}
              <strong>{prs.map((p) => p.name).join(", ")}</strong>
            </p>
          ) : (
            <p className="mt-4 text-lg">Another one in the bank. Consistency is the whole game.</p>
          )}
        </section>
      ) : null}

      <div className="border-b border-ink pb-5">
        <p className="eyebrow text-signal-deep">{formatDay(workout.finishedAt)}</p>
        <h1 className="display mt-2 text-5xl md:text-7xl">{workout.name}</h1>
      </div>

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Duration", formatDuration(workout.durationSec)],
          ["Volume", `${formatNumber(workout.volume)} kg`],
          ["Sets", completedSets(workout.exercises)],
          ["Exercises", workout.exercises.length],
        ].map(([label, value]) => (
          <div key={label} className="border-t border-line pt-3">
            <dt className="eyebrow text-muted">{label}</dt>
            <dd className="display tabular mt-2 text-4xl">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="space-y-4">
        {workout.exercises.map((ex) => {
          const meta = exerciseBySlug[ex.slug];
          const pr = prs.find((p) => p.slug === ex.slug);
          const best = Math.max(0, ...ex.sets.map((s) => estimate1RM(s.weight, s.reps)));
          return (
            <section key={ex.slug} className={`${card} p-5`}>
              <div className="flex items-baseline justify-between gap-4">
                <Link href={`/exercises/${ex.slug}`} className="text-lg font-semibold hover:underline">{ex.name}</Link>
                {pr ? (
                  <span className="rounded-full bg-good-soft px-3 py-1 text-xs font-semibold text-good">PR · {formatWeight(Math.round(pr.e1rm))} e1RM</span>
                ) : best ? (
                  <span className="tabular text-sm text-muted">{formatWeight(Math.round(best))} e1RM</span>
                ) : null}
              </div>
              <ol className="mt-3 flex flex-wrap gap-2">
                {ex.sets.map((s, i) => (
                  <li key={i} className="tabular rounded-lg bg-paper-2 px-3 py-1.5 text-sm">
                    {meta?.tracksWeight ? `${s.weight} kg × ${s.reps}` : `${s.reps}`}
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>

      {workout.notes ? (
        <section className={`${card} p-5`}>
          <h2 className="eyebrow text-muted">Notes</h2>
          <p className="mt-2 whitespace-pre-line">{workout.notes}</p>
        </section>
      ) : null}

      <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
        <DeleteWorkoutButton id={workout.id} />
        <div className="flex gap-2">
          <Link href="/workouts" className={button({ variant: "outline" })}>All history</Link>
          <Link href="/dashboard" className={button()}>Back to today</Link>
        </div>
      </div>
    </div>
  );
}
