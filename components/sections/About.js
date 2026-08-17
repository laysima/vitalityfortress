import Reveal from "@/components/Reveal";
import ScrollExpand from "@/components/ScrollExpand";

export default function About() {
  return (
    <section id="about" className="bg-bg py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 border-t border-white/10 pt-8 md:grid-cols-[0.55fr_1.25fr] md:gap-20">
          <Reveal className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            01 / Our philosophy
          </Reveal>

          <div>
            <Reveal
              as="h2"
              className="max-w-4xl text-4xl leading-[1.03] font-semibold tracking-[-0.045em] text-fg sm:text-5xl md:text-7xl"
            >
              Strong enough for the gym. Capable everywhere else.
            </Reveal>
            <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2">
              <Reveal delay={0.1} as="p" className="text-sm leading-7 text-fg/62">
                We train for the life outside these walls. Every session blends
                smart programming, skilled coaching, and steady progression so
                your fitness becomes something you can actually use.
              </Reveal>
              <Reveal delay={0.18} as="p" className="text-sm leading-7 text-fg/62">
                Whether this is day one or year ten, you get a plan that meets
                you where you are and a team that expects you to grow.
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1800px] md:mt-28">
        <ScrollExpand
          src="/images/about-strength.jpg"
          alt="Athlete preparing for a barbell lift in a strength gym"
          title="Earned, never given."
          scrollHint="Keep scrolling"
          startWidth={72}
          startHeight={68}
          startRadius={28}
          endRadius={0}
          mediaZoom={1.12}
          scrollDistance={0.8}
          holdDistance={0.1}
          overlayScrim={0.45}
          duotone={false}
          useWindowScroll
        >
          <p className="max-w-lg text-center text-sm leading-7 text-white/80 md:text-base">
            Coaching that respects the details. Programming that respects your time.
          </p>
        </ScrollExpand>
      </div>
    </section>
  );
}
