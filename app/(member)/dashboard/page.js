import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { GoalRing, VolumeChart } from "@/components/app/charts";
import { GoalStepper, LoadSampleButton } from "@/components/app/DashboardActions";
import { ExerciseDemoButton } from "@/components/app/ExerciseDemo";
import { button, card } from "@/components/ui/styles";
import { classTemplateById, coachBySlug, programBySlug } from "@/lib/catalog";
import { getBookings, getUser, getWorkouts } from "@/lib/dal";
import { firstName, formatDuration, formatNumber, formatRelativeDay, formatUpcomingDay, formatWeight, greeting } from "@/lib/format";
import { parseClassId } from "@/lib/schedule";
import { personalRecords, startOfWeek, weeklyBuckets, weekStreak } from "@/lib/stats";

export const metadata = { title: "Today" };

function NextSession({ user }) {
  const program = user.activeProgram ? programBySlug[user.activeProgram.slug] : null;
  if (!program) {
    return (
      <section className={`${card} flex flex-col justify-between gap-8 p-6 md:p-8`}>
        <div>
          <p className="eyebrow text-muted">Up next</p>
          <h2 className="display mt-3 text-5xl">Pick a program.</h2>
          <p className="mt-3 max-w-md text-ink-2">A program lays out every session set by set, and the app moves you to the next day when you finish.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/programs" className={button({ size: "lg" })}>Browse programs</Link>
          <Link href="/workouts/new" className={button({ variant: "outline", size: "lg" })}>Log a free session</Link>
        </div>
      </section>
    );
  }

  const dayIndex = user.activeProgram.nextDay ?? 0;
  const day = program.days[dayIndex];
  return (
    <section className="flex flex-col justify-between gap-8 rounded-(--radius-card) bg-ink p-6 text-paper md:p-8">
      <div>
        <div className="flex items-center justify-between">
          <p className="eyebrow text-signal">Up next · {program.name}</p>
          <p className="tabular text-xs text-paper/60">
            Session {(user.activeProgram.completed ?? 0) + 1} of {program.weeks * program.daysPerWeek}
          </p>
        </div>
        <h2 className="display mt-3 text-5xl md:text-6xl">{day.name}</h2>
        <ul className="mt-6 divide-y divide-paper/10 border-y border-paper/10">
          {day.exercises.map((ex) => (
            <li key={ex.slug} className="flex items-center justify-between gap-3 py-2 text-sm">
              <ExerciseDemoButton slug={ex.slug} thumbClassName="size-9" />
              <span className="tabular text-paper/60">
                {ex.sets} × {ex.reps}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/workouts/new?program=${program.slug}&day=${dayIndex}`} className={button({ variant: "signal", size: "lg" })}>
          Start session
        </Link>
        <Link href={`/programs/${program.slug}`} className={button({ variant: "ghost", size: "lg", className: "text-paper hover:bg-paper/10" })}>
          View program
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="eyebrow text-muted">{label}</p>
      <p className="display tabular mt-2 text-5xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export default async function DashboardPage({ searchParams }) {
  const [{ welcome }, user, workouts, bookings] = await Promise.all([searchParams, getUser(), getWorkouts(), getBookings()]);
  const now = new Date();
  const weekStart = startOfWeek(now).getTime();
  const thisWeek = workouts.filter((w) => new Date(w.finishedAt).getTime() >= weekStart);
  const weeks = weeklyBuckets(workouts, 8, now);
  const prs = personalRecords(workouts).slice(0, 4);
  const streak = weekStreak(workouts, now);
  const upcoming = bookings.slice(0, 3).map((b) => ({ ...b, parsed: parseClassId(b.classId) })).filter((b) => b.parsed);
  const isNew = workouts.length === 0;

  return (
    <div className="space-y-6">
      <div className="border-b border-ink pb-5">
        <p className="eyebrow text-signal-deep">{now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
        <h1 className="display mt-2 text-6xl md:text-8xl">
          {welcome ? "Welcome" : greeting(now)}, {firstName(user.name)}.
        </h1>
      </div>

      {isNew ? (
        <section className="animate-enter flex flex-col gap-4 rounded-(--radius-card) bg-signal-soft p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Your log is empty — that&apos;s day one.</h2>
            <p className="mt-1 text-ink-2">Log your first session, or load six weeks of sample training to explore the charts.</p>
          </div>
          <LoadSampleButton />
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <NextSession user={user} />

        <section className={`${card} flex flex-col gap-6 p-6 md:p-8`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-muted">This week</p>
              <p className="mt-2 max-w-48 text-sm text-ink-2">
                {thisWeek.length >= user.weeklyGoal
                  ? "Goal hit. Anything else is a bonus."
                  : `${user.weeklyGoal - thisWeek.length} more to hit your goal.`}
              </p>
            </div>
            <GoalRing done={thisWeek.length} goal={user.weeklyGoal} />
          </div>
          <GoalStepper goal={user.weeklyGoal} />
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Week streak" value={streak} hint={streak === 1 ? "week in a row" : "weeks in a row"} />
            <Stat label="Sessions" value={workouts.length} hint="all time" />
          </div>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className={`${card} p-6 md:p-8`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Volume per week</h2>
            <p className="tabular text-sm text-muted">{formatNumber(weeks.at(-1).volume)} kg this week</p>
          </div>
          <div className="mt-6">
            <VolumeChart weeks={weeks} />
          </div>
        </section>

        <section className={`${card} flex flex-col p-6 md:p-8`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Booked classes</h2>
            <Link href="/classes" className="text-sm text-signal-deep underline-offset-4 hover:underline">Timetable</Link>
          </div>
          {upcoming.length ? (
            <ul className="mt-4 divide-y divide-line">
              {upcoming.map(({ classId, parsed }) => {
                const t = classTemplateById[parsed.template.id];
                return (
                  <li key={classId} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-muted">with {coachBySlug[t.coach].name}</p>
                    </div>
                    <p className="tabular text-right text-sm">
                      {formatUpcomingDay(parsed.startsAt.toISOString(), now)}
                      <br />
                      <span className="text-muted">{t.time}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-1 flex-col items-start justify-center gap-3 py-6">
              <p className="text-ink-2">No classes booked this week.</p>
              <Link href="/classes" className={button({ variant: "outline", size: "sm" })}>Find a class</Link>
            </div>
          )}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className={`${card} p-6 md:p-8`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Recent sessions</h2>
            <Link href="/workouts" className="text-sm text-signal-deep underline-offset-4 hover:underline">All history</Link>
          </div>
          {workouts.length ? (
            <ul className="mt-4 divide-y divide-line">
              {workouts.slice(0, 4).map((w) => (
                <li key={w.id}>
                  <Link href={`/workouts/${w.id}`} className="-mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 hover:bg-ink/4">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{w.name}</p>
                      <p className="text-sm text-muted">{formatRelativeDay(w.finishedAt, now)} · {formatDuration(w.durationSec)}</p>
                    </div>
                    <p className="tabular shrink-0 text-sm">{formatNumber(w.volume)} kg</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-ink-2">Sessions you finish show up here.</p>
          )}
        </section>

        <section className={`${card} p-6 md:p-8`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold">Personal records</h2>
            <Link href="/progress" className="text-sm text-signal-deep underline-offset-4 hover:underline">Progress</Link>
          </div>
          {prs.length ? (
            <ul className="mt-4 divide-y divide-line">
              {prs.map((p) => (
                <li key={p.slug} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="tabular text-sm text-muted">Best set {formatWeight(p.weight)} × {p.reps}</p>
                  </div>
                  <p className="tabular text-right text-sm">
                    <span className="font-semibold">{formatWeight(Math.round(p.e1rm))}</span>
                    <br />
                    <span className="text-muted">est. 1RM</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-ink-2">Log a loaded lift to start tracking records.</p>
          )}
        </section>
      </div>

      <section id="account" className={`${card} flex scroll-mt-20 flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className={button({ variant: "outline" })}>Sign out</button>
        </form>
      </section>
    </div>
  );
}
