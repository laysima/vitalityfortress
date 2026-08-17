"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import TrueFocus from "@/components/TrueFocus";

const trainers = [
  { name: "Mara Cole", role: "Strength & power", image: "/images/coach-airam.jpg", position: "center" },
  { name: "Noah James", role: "Boxing & conditioning", image: "/images/coach-thomas.jpg", position: "center" },
  { name: "Talia Reed", role: "Mobility & performance", image: "/images/coach-joshua.jpg", position: "center" },
  { name: "Eli Mercer", role: "Olympic lifting", image: "/images/about-strength.jpg", position: "60% center" },
];

export default function Trainers() {
  const [active, setActive] = useState(null);

  return (
    <section id="trainers" className="bg-surface py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[0.55fr_1.25fr] md:gap-20">
          <Reveal className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            04 / Coaches
          </Reveal>
          <Reveal className="max-w-4xl">
            <TrueFocus
              sentence="Coaching that sees the details."
              manualMode={false}
              blurAmount={3}
              borderColor="#9bea63"
              glowColor="rgba(155, 234, 99, 0.24)"
              animationDuration={0.55}
              pauseBetweenAnimations={0.9}
              className="text-4xl leading-[1.08] font-semibold tracking-[-0.045em] text-fg sm:text-5xl md:text-7xl"
            />
          </Reveal>
        </div>

        <div
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          onMouseLeave={() => setActive(null)}
        >
          {trainers.map((trainer, index) => (
            <Reveal key={trainer.name} delay={index * 0.07}>
              <article
                onMouseEnter={() => setActive(index)}
                className={`group relative h-115 overflow-hidden rounded-3xl border border-white/10 bg-bg transition-all duration-500 md:h-130 ${
                  active !== null && active !== index ? "scale-[0.985] opacity-35" : "opacity-100"
                }`}
              >
                <Image
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.role} coach`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="editorial-image object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  style={{ objectPosition: trainer.position }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-lg font-semibold text-white">{trainer.name}</p>
                  <p className="mt-1 text-xs tracking-[0.1em] text-accent uppercase">{trainer.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
