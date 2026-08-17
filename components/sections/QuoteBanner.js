import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function QuoteBanner() {
  return (
    <section className="bg-surface px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative mx-auto flex min-h-[72vh] max-w-[1800px] items-end overflow-hidden rounded-3xl border border-white/10">
        <Image
          src="/images/hero-training.jpg"
          alt="Athlete completing an intense conditioning session"
          fill
          quality={92}
          sizes="100vw"
          className="editorial-image object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/45 to-bg/15" />
        <div className="absolute inset-0 bg-accent/5 mix-blend-color" />

        <Reveal className="relative z-10 grid w-full gap-8 px-6 py-10 md:grid-cols-[1fr_2fr] md:px-12 md:py-14 lg:px-20 lg:py-18">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            The Vitality standard
          </p>
          <blockquote className="max-w-4xl text-3xl leading-[1.08] font-semibold tracking-[-0.035em] text-white sm:text-4xl md:text-6xl">
            Leave every session more capable than you arrived.
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
