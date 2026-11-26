import Link from "next/link";
import { notFound } from "next/navigation";
import { LiftChart } from "@/components/app/charts";
import { ExerciseDemo } from "@/components/app/ExerciseDemo";
import { button, card } from "@/components/ui/styles";
import { exerciseBySlug, programs } from "@/lib/catalog";
import { getWorkouts } from "@/lib/dal";
import { formatDay, formatWeight } from "@/lib/format";
import { liftHistory, personalRecords } from "@/lib/stats";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: exerciseBySlug[slug]?.name ?? "Exercise" };
}

export default async function ExercisePage({ params }) {
  const { slug } = await params;
  const exercise = exerciseBySlug[slug];
  if (!exercise) notFound();

  const workouts = await getWorkouts();
  const history = exercise.tracksWeight ? liftHistory(workouts, slug) : [];
  const pr = personalRecords(workouts).find((p) => p.slug === slug);
  const recent = workouts.filter((w) => w.exercises.some((e) => e.slug === slug)).slice(0, 5);
  const usedIn = programs.filter((p) => p.days.some((d) => d.exercises.some((e) => e.slug === slug)));

  return (
    <div className="space-y-8">
      <Link href="/exercises" className="text-sm text-muted hover:text-ink">← Library</Link>

      <div className="border-b border-ink pb-5">
        <p className="eyebrow text-signal-deep">{exercise.group} · {exercise.equipment} · {exercise.level}</p>
        <h1 className="display mt-2 text-6xl md:text-8xl">{exercise.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">{exercise.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className={`${card} p-4 sm:p-5 lg:col-span-2 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8`}>
          <ExerciseDemo slug={slug} />
          <div className="mt-6 lg:mt-2">
            <h2 className="eyebrow text-muted">How to do it</h2>
            <p className="mt-3 text-ink-2">Watch the demo loop between the start and end of the movement, or step through the two positions yourself.</p>
            <p className="mt-4 text-sm text-muted">Level: {exercise.level} · Equipment: {exercise.equipment}</p>
          </div>
        </section>

        <section className={`${card} p-6`}>
          <h2 className="eyebrow text-muted">Coaching cues</h2>
          <ol className="mt-4 space-y-4">
            {exercise.cues.map((cue, i) => (
              <li key={cue} className="flex gap-4">
                <span className="display tabular text-3xl text-signal">{i + 1}</span>
                <span className="pt-1 text-lg leading-snug">{cue}</span>
              </li>
            ))}
          </ol>
          {usedIn.length ? (
            <div className="mt-8 border-t border-line pt-4">
              <h3 className="eyebrow text-muted">Used in</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {usedIn.map((p) => (
                  <Link key={p.slug} href={`/programs/${p.slug}`} className={button({ variant: "outline", size: "sm" })}>{p.name}</Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className={`${card} p-6`}>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-semibold">{exercise.tracksWeight ? "Estimated 1RM" : "Your recent sets"}</h2>
            {pr ? <p className="tabular text-sm text-muted">Best {formatWeight(pr.weight)} × {pr.reps}</p> : null}
          </div>
          {history.length >= 2 ? (
            <div className="mt-6">
              <LiftChart points={history} />
            </div>
          ) : recent.length ? (
            <ul className="mt-4 divide-y divide-line">
              {recent.map((w) => {
                const ex = w.exercises.find((e) => e.slug === slug);
                return (
                  <li key={w.id} className="flex justify-between gap-4 py-3 text-sm">
                    <Link href={`/workouts/${w.id}`} className="hover:underline">{formatDay(w.finishedAt)}</Link>
                    <span className="tabular text-muted">
                      {ex.sets.map((s) => (exercise.tracksWeight ? `${s.weight}×${s.reps}` : s.reps)).join(" · ")}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-ink-2">Log this exercise twice and your trend appears here.</p>
          )}
        </section>
      </div>
    </div>
  );
}
