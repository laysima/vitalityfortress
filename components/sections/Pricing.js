import Link from "next/link";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";

const plans = [
  {
    name: "Essential",
    price: "$39",
    note: "For building a steady weekly rhythm.",
    features: ["4 coached sessions", "Open gym access", "Monthly progress check"],
  },
  {
    name: "Performance",
    price: "$79",
    note: "Our best balance of coaching and flexibility.",
    features: ["12 coached sessions", "Unlimited open gym", "Program and goal review"],
    highlighted: true,
  },
  {
    name: "Unlimited",
    price: "$119",
    note: "For training without counting sessions.",
    features: ["Unlimited coaching", "Priority class booking", "Quarterly 1:1 session"],
  },
];

export default function Pricing() {
  return (
    <section id="plan" className="bg-bg py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.55fr_1.25fr] md:gap-20">
          <Reveal className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            Membership
          </Reveal>
          <div>
            <Reveal as="h2" className="max-w-4xl text-4xl leading-[1.03] font-semibold tracking-[-0.045em] sm:text-5xl md:text-7xl">
              Pick your pace. We&apos;ll build the plan.
            </Reveal>
            <Reveal delay={0.1} as="p" className="mt-7 max-w-xl text-sm leading-7 text-fg/58">
              Every membership starts with a movement assessment and includes
              coaching from day one. Pause or change your plan anytime.
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <SpotlightCard
                className={`flex min-h-120 flex-col rounded-3xl border p-7 md:p-9 ${
                  plan.highlighted
                    ? "border-accent/55 bg-accent/[0.07]"
                    : "border-white/10 bg-surface"
                }`}
              >
                <div className="relative z-10">
                  <p className="text-xs font-semibold tracking-[0.16em] text-fg/70 uppercase">
                    {plan.name}
                  </p>
                </div>

                {plan.highlighted && (
                  <p className="relative z-10 mt-6 w-fit rounded-full bg-accent px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.16em] text-accent-fg uppercase">
                    Most popular
                  </p>
                )}

                <p className={`${plan.highlighted ? "mt-9" : "mt-20"} relative z-10 text-5xl font-bold tracking-[-0.055em] text-fg md:text-6xl`}>
                  {plan.price}
                  <span className="ml-2 text-sm font-normal tracking-normal text-muted">/ month</span>
                </p>
                <p className="relative z-10 mt-4 max-w-60 text-sm leading-6 text-fg/55">
                  {plan.note}
                </p>

                <ul className="relative z-10 mt-9 space-y-0 text-sm text-fg/72">
                  {plan.features.map((feature) => (
                    <li key={feature} className="border-t border-white/10 py-3.5">
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className={`relative z-10 mt-auto flex justify-center rounded-full px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${
                    plan.highlighted
                      ? "bg-accent text-accent-fg hover:bg-kelly"
                      : "border border-white/18 text-fg hover:border-accent hover:text-accent"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-7 text-center text-xs text-muted">
          All plans include a free first session. No joining fee.
        </p>
      </div>
    </section>
  );
}
