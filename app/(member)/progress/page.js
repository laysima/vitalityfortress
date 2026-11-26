import Link from "next/link";
import { VolumeChart } from "@/components/app/charts";
import LiftPicker from "@/components/app/LiftPicker";
import PageHeader from "@/components/app/PageHeader";
import { button, card } from "@/components/ui/styles";
import { exerciseBySlug } from "@/lib/catalog";
import { getWorkouts } from "@/lib/dal";
import { formatDay, formatDuration, formatNumber, formatWeight } from "@/lib/format";
import { liftHistory, personalRecords, trackedLifts, weeklyBuckets, weekStreak } from "@/lib/stats";

export const metadata = { title: "Progress" };

export default async function ProgressPage() {
  const workouts = await getWorkouts();
  const now = new Date();

  if (!workouts.length) {
    return (
      <>
        <PageHeader kicker="Your numbers" title="Progress" />
        <div className={`${card} flex flex-col items-start gap-4 p-8`}>
          <h2 className="display text-4xl">No data yet.</h2>
          <p className="max-w-md text-ink-2">Volume, streaks, estimated maxes and personal records are calculated from the sessions you log.</p>
          <Link href="/workouts/new" className={button({ size: "lg" })}>Log a workout</Link>
        </div>
      </>
    );
  }

  const weeks = weeklyBuckets(workouts, 12, now);
  const last4 = weeks.slice(-4);
  const prev4 = weeks.slice(-8, -4);
  const sum = (arr, k) => arr.reduce((n, w) => n + w[k], 0);
  const volNow = sum(last4, "volume");
  const volPrev = sum(prev4, "volume");
  const volChange = volPrev ? Math.round(((volNow - volPrev) / volPrev) * 100) : null;

  const lifts = trackedLifts(workouts).map((l) => ({ ...l, points: liftHistory(workouts, l.slug) })).filter((l) => l.points.length >= 2);
  const prs = personalRecords(workouts);

  const groupCounts = {};
  for (const w of workouts.filter((w) => new Date(w.finishedAt) > new Date(now.getTime() - 28 * 864e5))) {
    for (const ex of w.exercises) {
      const g = exerciseBySlug[ex.slug]?.group ?? "Other";
      groupCounts[g] = (groupCounts[g] ?? 0) + ex.sets.length;
    }
  }
  const groups = Object.entries(groupCounts).sort((a, b) => b[1] - a[1]);
  const maxGroup = Math.max(1, ...groups.map(([, n]) => n));

  return (
    <>
      <PageHeader kicker="Your numbers" title="Progress" />

      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Sessions", formatNumber(workouts.length), "all time"],
          ["Week streak", weekStreak(workouts, now), "weeks in a row"],
          ["Tonnes lifted", (Math.round(volNow / 100) / 10).toLocaleString("en-GB"), volChange === null ? "last 4 weeks" : `last 4 weeks · ${volChange >= 0 ? "+" : "−"}${Math.abs(volChange)}% vs prior 4`],
          ["Time training", formatDuration(sum(last4, "minutes") * 60), "last 4 weeks"],
        ].map(([label, value, hint]) => (
          <div key={label} className="border-t border-ink pt-3">
            <dt className="eyebrow text-muted">{label}</dt>
            <dd className="display tabular mt-2 text-5xl">{value}</dd>
            <dd className="mt-1 text-xs text-muted">{hint}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className={`${card} p-6`}>
          <h2 className="font-semibold">Volume per week</h2>
          <p className="text-sm text-muted">Weight × reps for completed sets, last 12 weeks</p>
          <div className="mt-6">
            <VolumeChart weeks={weeks} />
          </div>
        </section>

        <section className={`${card} p-6`}>
          {lifts.length ? (
            <LiftPicker lifts={lifts} />
          ) : (
            <>
              <h2 className="font-semibold">Estimated 1RM</h2>
              <p className="mt-3 text-ink-2">Log a loaded lift in two sessions to see its trend.</p>
            </>
          )}
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className={`${card} overflow-hidden`}>
          <h2 className="p-6 pb-3 font-semibold">Personal records</h2>
          {prs.length ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-line text-left text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                  <th className="px-6 py-2 font-semibold">Lift</th>
                  <th className="px-3 py-2 text-right font-semibold">Best set</th>
                  <th className="px-3 py-2 text-right font-semibold">e1RM</th>
                  <th className="hidden px-6 py-2 text-right font-semibold sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {prs.map((p) => (
                  <tr key={p.slug}>
                    <td className="px-6 py-3"><Link href={`/exercises/${p.slug}`} className="font-medium hover:underline">{p.name}</Link></td>
                    <td className="tabular px-3 py-3 text-right">{formatWeight(p.weight)} × {p.reps}</td>
                    <td className="tabular px-3 py-3 text-right font-semibold">{formatWeight(Math.round(p.e1rm))}</td>
                    <td className="tabular hidden px-6 py-3 text-right text-muted sm:table-cell">{formatDay(p.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-6 pb-6 text-ink-2">Log a loaded lift to start tracking records.</p>
          )}
        </section>

        <section className={`${card} p-6`}>
          <h2 className="font-semibold">Sets by muscle group</h2>
          <p className="text-sm text-muted">Last 4 weeks</p>
          {groups.length ? (
            <ul className="mt-5 space-y-3">
              {groups.map(([g, n]) => (
                <li key={g}>
                  <div className="flex justify-between text-sm">
                    <span>{g}</span>
                    <span className="tabular text-muted">{n} sets</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper-2">
                    <div className="h-full rounded-full bg-signal" style={{ width: `${(n / maxGroup) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-ink-2">No sessions in the last four weeks.</p>
          )}
        </section>
      </div>
    </>
  );
}
