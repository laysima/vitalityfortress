import Reveal from "@/components/Reveal";

const plans = [
  {
    name: "Starter",
    price: "$8.99",
    features: ["100 Transaction", "2% Cash Back"],
    highlighted: false,
  },
  {
    name: "Popular",
    price: "$29.99",
    features: ["1000 Transaction", "3.5% Cash Back", "$100,000 limit"],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$99.99",
    features: ["Unlimited Transaction", "5% Cash Back"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="plan" className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <h2 className="mb-10 text-center text-2xl font-semibold text-title md:text-3xl">
        Our Plan
      </h2>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
        {plans.map((plan) => (
          <Reveal
            key={plan.name}
            className={`flex w-full max-w-75 flex-col items-center rounded-sm bg-gradient-to-br from-white to-neutral-50 p-6 text-[#1d2220] shadow-[0_3px_10px_rgba(15,62,157,0.5)] transition-transform hover:scale-103 ${
              plan.highlighted ? "sm:-translate-y-3" : ""
            }`}
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>
            <p className="mt-1 text-4xl font-semibold">{plan.price}</p>
            <p className="mb-4 text-sm text-neutral-600">per Month</p>
            <ul className="mb-8 space-y-2 text-center">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`mt-auto w-4/5 rounded-lg py-3 text-lg transition-[border-radius] hover:rounded-none ${
                plan.highlighted
                  ? "bg-[#8d5c5c] text-white"
                  : "bg-white text-[#1d2220] ring-1 ring-neutral-200"
              }`}
            >
              Choose Plan
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
