import Link from "next/link";
import { Container } from "@/components/marketing/Section";
import { button } from "@/components/ui/styles";

// Static previews built from the same visual language as the member app.

function LoggerPreview() {
  const rows = [
    { set: 1, kg: 80, reps: 5, done: true },
    { set: 2, kg: 82.5, reps: 5, done: true },
    { set: 3, kg: 82.5, reps: 5, done: false },
  ];
  return (
    <div className="rounded-2xl bg-paper p-5 text-ink">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold">Back Squat</p>
        <p className="tabular text-xs text-muted">Best 85 kg × 5</p>
      </div>
      <div className="mt-4 grid grid-cols-[2rem_1fr_1fr_2.5rem] gap-2 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted uppercase">
        <span>Set</span>
        <span>kg</span>
        <span>Reps</span>
        <span />
      </div>
      {rows.map((r) => (
        <div key={r.set} className={`mt-2 grid grid-cols-[2rem_1fr_1fr_2.5rem] items-center gap-2 rounded-lg ${r.done ? "bg-good-soft" : ""}`}>
          <span className="tabular pl-2 text-sm text-muted">{r.set}</span>
          <span className="tabular rounded-md bg-card px-2 py-1.5 text-sm font-medium">{r.kg}</span>
          <span className="tabular rounded-md bg-card px-2 py-1.5 text-sm font-medium">{r.reps}</span>
          <span className={`flex size-8 items-center justify-center rounded-md text-sm ${r.done ? "bg-good text-white" : "border border-line-strong"}`} aria-hidden="true">
            {r.done ? "✓" : ""}
          </span>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-paper">
        <span className="text-xs tracking-[0.1em] uppercase">Rest</span>
        <span className="tabular display text-3xl">2:14</span>
      </div>
    </div>
  );
}

function ProgressPreview() {
  const bars = [42, 55, 49, 63, 70, 66, 78, 86];
  return (
    <div className="rounded-2xl bg-paper p-5 text-ink">
      <p className="eyebrow text-muted">Weekly volume</p>
      <p className="tabular mt-1 text-3xl font-semibold tracking-tight">
        14,820 <span className="text-base font-normal text-muted">kg</span>
      </p>
      <div className="mt-5 flex h-28 items-end gap-2" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-signal" : "bg-ink/15"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span>New PR · Deadlift</span>
        <span className="tabular font-semibold text-good">+5 kg</span>
      </div>
    </div>
  );
}

function ClassPreview() {
  return (
    <div className="rounded-2xl bg-paper p-5 text-ink">
      <div className="flex gap-2 text-center text-xs">
        {["Mon 24", "Tue 25", "Wed 26", "Thu 27"].map((d, i) => (
          <span key={d} className={`flex-1 rounded-lg py-2 ${i === 2 ? "bg-ink text-paper" : "bg-card"}`}>
            {d}
          </span>
        ))}
      </div>
      {[
        { t: "06:30", n: "Barbell Strength", left: "3 spots left", booked: true },
        { t: "12:15", n: "Core 30", left: "9 spots left", booked: false },
      ].map((c) => (
        <div key={c.t} className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-card p-3">
          <div>
            <p className="tabular text-xs text-muted">{c.t}</p>
            <p className="font-semibold">{c.n}</p>
            <p className="text-xs text-muted">{c.left}</p>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${c.booked ? "bg-good-soft text-good" : "bg-ink text-paper"}`}>
            {c.booked ? "Booked" : "Book"}
          </span>
        </div>
      ))}
    </div>
  );
}

const features = [
  { title: "Log every set", body: "Weights, reps and a rest timer that starts itself. Your last session's numbers sit right beside the inputs.", preview: <LoggerPreview /> },
  { title: "See it adding up", body: "Weekly volume, streaks, estimated maxes and personal records, worked out from what you actually lifted.", preview: <ProgressPreview /> },
  { title: "Book in two taps", body: "The full timetable with live spots left. Book, cancel and see your week at a glance.", preview: <ClassPreview /> },
];

export default function AppShowcase() {
  return (
    <section id="app" className="scroll-mt-16 bg-ink py-20 text-paper md:py-32">
      <Container>
        <div className="grid gap-6 border-t border-paper/40 pt-5 md:grid-cols-[0.4fr_1fr] md:gap-12">
          <p className="eyebrow flex gap-3" data-reveal>
            <span className="tabular text-signal">02</span>
            <span>The app</span>
          </p>
          <div data-reveal style={{ "--reveal-delay": "60ms" }}>
            <h2 className="display text-[clamp(3rem,8vw,6.5rem)]">
              Your coach,<br />between sessions.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
              Every membership includes the Pain&amp;Gains app: your program, your log, your
              progress and the class timetable in one place.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <article key={f.title} className="flex flex-col rounded-(--radius-card) bg-ink-2/60 p-4 ring-1 ring-paper/10" data-reveal style={{ "--reveal-delay": `${i * 70}ms` }}>
              {f.preview}
              <div className="px-2 pt-6 pb-3">
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/65">{f.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4" data-reveal>
          <Link href="/login?mode=signup" className={button({ variant: "signal", size: "lg" })}>
            Create your account
          </Link>
          <p className="text-sm text-paper/60">Free to start. Programs and logging included.</p>
        </div>
      </Container>
    </section>
  );
}
