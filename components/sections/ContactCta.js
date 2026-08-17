import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactCta() {
  return (
    <section id="contact" className="bg-bg px-4 py-4 md:px-6 md:py-6">
      <div className="relative mx-auto min-h-135 max-w-[1800px] overflow-hidden rounded-3xl bg-accent text-accent-fg">
        <div className="absolute inset-0 opacity-[0.09] noise" />
        <div className="relative grid min-h-135 items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-12 lg:px-20">
          <Reveal className="relative z-10 max-w-4xl">
            <p className="mb-7 text-xs font-bold tracking-[0.18em] uppercase">
              Your first session is on us
            </p>
            <h2 className="text-5xl leading-[0.94] font-black tracking-[-0.06em] uppercase sm:text-6xl md:text-8xl">
              Ready when you are.
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-accent-fg/72 md:text-base">
              Tour the space, meet a coach, and leave with a clear starting
              point. No pressure and no generic sales pitch.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-accent-fg px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-accent uppercase transition-transform hover:scale-[1.03]"
              >
                Book a free session
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-accent-fg/25 px-7 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors hover:border-accent-fg"
              >
                View memberships
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative hidden h-105 overflow-hidden rounded-3xl border border-accent-fg/15 md:block">
            <Image
              src="/images/coach-joshua.jpg"
              alt="Coach demonstrating a dumbbell movement"
              fill
              sizes="36vw"
              className="object-cover object-center saturate-75 contrast-110"
            />
            <div className="absolute inset-0 bg-accent/15 mix-blend-color" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
