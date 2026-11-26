import Image from "next/image";
import Link from "next/link";

// Composition: outlined intro box (left), tall photo panel (right), a cut-out athlete
// breaking out of the panel, and a giant italic headline running across all three.
// The headline is slightly translucent so the athlete reads through the letters.

const contacts = [
  {
    href: "tel:0262692988",
    label: "Call 026 269 2988",
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  },
  {
    href: "/contact",
    label: "Find us: Planners Avenue, New Port",
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  {
    href: "/#classes",
    label: "See the class timetable",
    icon: <path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" />,
  },
];

function ContactRail({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <p className="eyebrow text-muted [writing-mode:vertical-rl] rotate-180 max-lg:hidden">Visit</p>
      <ul className="flex gap-3 lg:flex-col">
        {contacts.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              aria-label={c.label}
              className="press flex size-11 items-center justify-center rounded-full border border-line-strong text-ink-2 hover:border-ink hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                {c.icon}
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative pt-6 lg:h-[clamp(640px,calc(100dvh-4.5rem),880px)] lg:pt-0">
          {/* Intro box */}
          <div className="hero-fade relative border border-ink p-6 sm:p-8 lg:absolute lg:top-6 lg:left-0 lg:h-[42%] lg:w-[36%] lg:p-10">
            <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] font-light tracking-[-0.01em] uppercase [font-stretch:80%]">
              Get strong and feel great with a coach in your corner
            </p>
          </div>

          {/* Stage: panel + athlete + headline */}
          <div className="relative mt-6 h-[min(125vw,620px)] lg:absolute lg:inset-0 lg:mt-0 lg:h-auto">
            <div className="hero-panel absolute top-0 right-0 bottom-0 w-[62%] overflow-hidden bg-ink lg:top-6 lg:bottom-6 lg:w-[36%]">
              <Image
                src="/images/gym.png"
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 62vw, 36vw"
                className="object-cover object-[30%_center] brightness-110 contrast-105 grayscale"
              />
            </div>

            {/* Sprinter in the set position: a wide figure, so it is sized by width. */}
            <div className="hero-athlete absolute bottom-[15%] left-0 z-10 w-[96%] lg:bottom-6 lg:left-[22%] lg:w-[min(54%,calc((100dvh-4.5rem)*0.72))]">
              <Image
                src="/images/hero-sprinter-hd.png"
                alt="Sprinter crouched in the set position, ready to explode off the line"
                width={1884}
                height={1773}
                priority
                quality={90}
                sizes="(max-width: 1024px) 96vw, 54vw"
                className="h-auto w-full"
              />
            </div>

            <h1 className="display pointer-events-none absolute top-[34%] left-0 z-20 text-[clamp(4.25rem,19vw,11rem)] text-signal/85 italic lg:top-[35%] lg:left-[9%] lg:text-[clamp(6rem,11.5vw,11rem)]">
              <span className="rise-line px-[0.08em]" style={{ "--i": 0 }}>
                <span>No pain,</span>
              </span>
              <span className="rise-line pr-[0.12em] pl-[0.5em] lg:pl-[1.4em]" style={{ "--i": 1 }}>
                <span>no gains!</span>
              </span>
            </h1>

            <Link
              href="/login?mode=signup"
              className="hero-fade press absolute right-[4%] bottom-6 z-30 bg-paper px-6 py-4 text-sm font-semibold tracking-[0.16em] text-signal-deep uppercase shadow-[0_10px_30px_rgb(21_20_18/0.18)] hover:bg-white lg:right-[4%] lg:bottom-[26%] lg:px-9 lg:py-5 lg:text-base"
            >
              Start free trial
            </Link>

            <ContactRail className="hero-fade absolute top-[62%] left-[11%] z-30 max-lg:hidden" />
          </div>

          <ContactRail className="hero-fade mt-6 mb-10 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
