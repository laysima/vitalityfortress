import { Container, SectionHead } from "@/components/marketing/Section";

const steps = [
  {
    n: "01",
    title: "Assess",
    body: "Your first session is a movement screen with a coach. We find your starting weights, your limits and what you actually want from training.",
  },
  {
    n: "02",
    title: "Program",
    body: "Pick a program that fits your week, from three-day Foundations to a four-day Build Split. Every session is laid out set by set in the app.",
  },
  {
    n: "03",
    title: "Progress",
    body: "Log as you lift. The app tracks your volume, estimated maxes and personal records, so you always know when it's time to add weight.",
  },
];

export default function Method() {
  return (
    <section id="method" className="scroll-mt-20 py-20 md:py-32">
      <Container>
        <SectionHead
          index="01"
          kicker="The method"
          title="Simple. Not easy."
          intro="No gimmicks, no shortcuts. A clear plan, coaching that sees the details, and a record of every rep you've earned."
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.n} className="bg-card p-7 md:p-9" data-reveal style={{ "--reveal-delay": `${i * 70}ms` }}>
              <p className="display tabular text-7xl text-signal">{s.n}</p>
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
