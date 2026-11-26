import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExerciseDemoButton } from "@/components/app/ExerciseDemo";
import ProgramActions from "@/components/app/ProgramActions";
import { button, card } from "@/components/ui/styles";
import { programBySlug } from "@/lib/catalog";
import { getUser } from "@/lib/dal";
import { formatClock } from "@/lib/format";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: programBySlug[slug]?.name ?? "Program" };
}

export default async function ProgramPage({ params }) {
  const { slug } = await params;
  const program = programBySlug[slug];
  if (!program) notFound();

  const user = await getUser();
  const isActive = user.activeProgram?.slug === slug;
  const nextDay = isActive ? (user.activeProgram.nextDay ?? 0) : null;
  const total = program.weeks * program.daysPerWeek;
  const completed = isActive ? (user.activeProgram.completed ?? 0) : 0;

  return (
    <div className="space-y-8">
      <Link href="/programs" className="text-sm text-muted hover:text-ink">← All programs</Link>

      <section className="relative overflow-hidden rounded-(--radius-card) bg-ink text-paper">
        <Image src={program.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover opacity-45" />
        <div className="relative p-6 md:p-10">
          <p className="eyebrow text-signal">{program.level} · {program.weeks} weeks · {program.daysPerWeek} days a week</p>
          <h1 className="display mt-4 text-[clamp(3.5rem,15vw,8rem)] break-words">{program.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-paper/80">{program.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ProgramActions slug={program.slug} name={program.name} isActive={isActive} hasOther={Boolean(user.activeProgram) && !isActive} />
            {isActive ? (
              <Link href={`/workouts/new?program=${program.slug}&day=${nextDay}`} className={button({ variant: "signal", size: "lg" })}>
                Start next session
              </Link>
            ) : null}
          </div>
          {isActive ? (
            <div className="mt-8 max-w-md">
              <div className="flex justify-between text-sm text-paper/70">
                <span>Progress</span>
                <span className="tabular">{Math.min(completed, total)} / {total} sessions</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper/15">
                <div className="h-full origin-left rounded-full bg-signal" style={{ transform: `scaleX(${Math.min(1, completed / total)})` }} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {program.days.map((day, i) => (
          <section key={day.name} className={`${card} p-5 md:p-6 ${nextDay === i ? "ring-2 ring-signal" : ""}`}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold">{day.name}</h2>
              {nextDay === i ? <span className="eyebrow text-signal-deep">Up next</span> : null}
            </div>
            <p className="mt-1 text-sm text-muted">Tap an exercise to see how it&apos;s done.</p>
            <table className="mt-4 w-full text-sm">
              <thead>
                <tr className="text-left text-[0.6875rem] tracking-[0.1em] text-muted uppercase">
                  <th className="pb-2 font-semibold">Exercise</th>
                  <th className="pb-2 text-right font-semibold">Sets × reps</th>
                  <th className="pb-2 text-right font-semibold">Rest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-t border-line">
                {day.exercises.map((ex) => (
                  <tr key={ex.slug}>
                    <td className="py-2">
                      <ExerciseDemoButton slug={ex.slug} />
                    </td>
                    <td className="tabular py-2.5 text-right">{ex.sets} × {ex.reps}</td>
                    <td className="tabular py-2.5 text-right text-muted">{formatClock(ex.rest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href={`/workouts/new?program=${program.slug}&day=${i}`} className={button({ variant: "outline", size: "sm", className: "mt-4" })}>
              Log this session
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
