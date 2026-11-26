import Link from "next/link";
import { Container, SectionHead } from "@/components/marketing/Section";
import { button } from "@/components/ui/styles";

const plans = [
  { name: "Essential", price: 39, note: "A steady weekly rhythm.", features: ["4 coached classes a month", "Open gym access", "Full app: programs, logging, progress", "Monthly progress check-in"] },
  { name: "Performance", price: 79, note: "Our best balance of coaching and freedom.", features: ["12 coached classes a month", "Unlimited open gym", "Full app: programs, logging, progress", "Program and goal review"], featured: true },
  { name: "Unlimited", price: 119, note: "Train without counting.", features: ["Unlimited coached classes", "Priority booking window", "Full app: programs, logging, progress", "Quarterly one-to-one session"] },
];

export default function Membership() {
  return (
    <section id="membership" className="scroll-mt-16 bg-paper-2 py-20 md:py-32">
      <Container>
        <SectionHead
          index="06"
          kicker="Membership"
          title="Pick your pace."
          intro="Every plan starts with a free movement assessment. Pause or change your plan any time. No joining fee."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((p, i) => (
            <article
              key={p.name}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` }}
              className={`flex flex-col rounded-(--radius-card) p-7 md:p-8 ${p.featured ? "bg-ink text-paper" : "border border-line bg-card"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.featured ? (
                  <span className="rounded-full bg-signal px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink uppercase">Most popular</span>
                ) : null}
              </div>
              <p className="mt-10 flex items-baseline gap-2">
                <span className="display tabular text-8xl">${p.price}</span>
                <span className={p.featured ? "text-paper/60" : "text-muted"}>/ month</span>
              </p>
              <p className={`mt-3 ${p.featured ? "text-paper/70" : "text-ink-2"}`}>{p.note}</p>
              <ul className={`mt-8 border-t ${p.featured ? "border-paper/15" : "border-line"}`}>
                {p.features.map((f) => (
                  <li key={f} className={`border-b py-3 text-sm ${p.featured ? "border-paper/15" : "border-line"}`}>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/login?mode=signup&plan=${p.name.toLowerCase()}`}
                className={button({ variant: p.featured ? "signal" : "primary", size: "lg", className: "mt-8 w-full" })}
              >
                Choose {p.name}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
