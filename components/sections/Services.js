import Image from "next/image";
import Reveal from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";

const services = [
  {
    eyebrow: "Build",
    title: "Strength training",
    description:
      "Progressive programs built around how you move, what you need, and where you want to go.",
    image: "/images/kettlebell-training.jpg",
    className: "md:col-span-2 md:min-h-145",
  },
  {
    eyebrow: "Refine",
    title: "Expert coaching",
    description:
      "Real-time feedback, precise form cues, and a coach who knows when to push and when to adapt.",
    image: "/images/coach-airam.jpg",
    className: "md:min-h-145",
  },
  {
    eyebrow: "Measure",
    title: "Progress that shows",
    description:
      "Simple tracking for your sessions, lifts, and milestones so the work never disappears into guesswork.",
    image: "/images/about-strength.jpg",
    className: "md:col-span-3 md:min-h-115",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.55fr_1.25fr] md:gap-20">
          <Reveal className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            Training
          </Reveal>
          <Reveal as="h2" className="max-w-4xl text-4xl leading-[1.03] font-semibold tracking-[-0.045em] sm:text-5xl md:text-7xl">
            Everything you need. Nothing you don&apos;t.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-5">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.08} className={service.className}>
              <SpotlightCard className="group h-full min-h-125 rounded-3xl border border-white/10 bg-bg">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes={index === 1 ? "(max-width: 768px) 100vw, 34vw" : "(max-width: 768px) 100vw, 66vw"}
                  className={`editorial-image object-cover transition-transform duration-700 group-hover:scale-[1.025] ${
                    index === 1 ? "object-center" : index === 2 ? "object-[center_62%]" : "object-center"
                  }`}
                />
                <div className="absolute inset-0 -z-0 bg-linear-to-t from-bg via-bg/28 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-9">
                  <div className="mb-5 border-b border-white/16 pb-4 text-[0.62rem] font-semibold tracking-[0.18em] uppercase">
                    <span className="text-accent">{service.eyebrow}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/62">
                    {service.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
