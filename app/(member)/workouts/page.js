import Link from "next/link";
import PageHeader from "@/components/app/PageHeader";
import { button, card } from "@/components/ui/styles";
import { getWorkouts } from "@/lib/dal";
import { formatDay, formatDuration, formatNumber } from "@/lib/format";
import { completedSets, startOfWeek } from "@/lib/stats";

export const metadata = { title: "History" };

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  // Group by training week, newest first.
  const groups = [];
  for (const w of workouts) {
    const start = startOfWeek(new Date(w.finishedAt)).toISOString();
    let g = groups.at(-1);
    if (!g || g.start !== start) {
      g = { start, items: [], volume: 0 };
      groups.push(g);
    }
    g.items.push(w);
    g.volume += w.volume;
  }

  return (
    <>
      <PageHeader kicker={`${workouts.length} session${workouts.length === 1 ? "" : "s"}`} title="History">
        <Link href="/workouts/new" className={button()}>Log a workout</Link>
      </PageHeader>

      {groups.length ? (
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.start}>
              <div className="mb-3 flex items-baseline justify-between">
                <h2 className="eyebrow text-muted">Week of {formatDay(g.start)}</h2>
                <p className="tabular text-sm text-muted">
                  {g.items.length} session{g.items.length === 1 ? "" : "s"} · {formatNumber(g.volume)} kg
                </p>
              </div>
              <ul className={`${card} divide-y divide-line overflow-hidden`}>
                {g.items.map((w) => (
                  <li key={w.id}>
                    <Link href={`/workouts/${w.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-paper/60">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{w.name}</p>
                        <p className="mt-0.5 truncate text-sm text-muted">{w.exercises.map((e) => e.name).join(" · ")}</p>
                      </div>
                      <div className="tabular shrink-0 text-right text-sm">
                        <p>{formatDay(w.finishedAt)}</p>
                        <p className="text-muted">
                          {formatDuration(w.durationSec)} · {completedSets(w.exercises)} sets
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className={`${card} flex flex-col items-start gap-4 p-8`}>
          <h2 className="display text-4xl">Nothing logged yet.</h2>
          <p className="text-ink-2">Every session you finish is saved here with its sets, volume and time.</p>
          <Link href="/workouts/new" className={button({ size: "lg" })}>Log your first workout</Link>
        </div>
      )}
    </>
  );
}
