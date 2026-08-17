import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/SplitText";

const stats = [
  { value: "500+", label: "active members" },
  { value: "50+", label: "sessions weekly" },
  { value: "12", label: "expert coaches" },
  { value: "4.9", label: "member rating" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0 opacity-[0.045] noise" />
      <div className="absolute top-[-20rem] left-[-12rem] h-[44rem] w-[44rem] rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-end gap-12 px-6 pt-32 pb-12 md:px-10 lg:grid-cols-[0.92fr_1.2fr] lg:gap-8 lg:pt-36">
        <div className="relative z-10 pb-4 lg:pb-14">
          <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.24em] text-accent uppercase">
            <span className="h-px w-9 bg-accent" />
            Training for real life
          </p>

          <SplitText
            text="BUILT FOR MORE"
            as="h1"
            className="max-w-4xl text-[clamp(4.6rem,10.5vw,9.2rem)] leading-[0.78] font-black tracking-[-0.07em] text-fg"
          />

          <p className="mt-8 max-w-md text-sm leading-7 text-fg/62 md:text-base">
            Personal coaching, progressive strength work, and a community that
            keeps showing up. No gimmicks. Just training that changes you.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/login"
              className="rounded-full bg-accent px-7 py-3.5 text-xs font-semibold tracking-[0.12em] text-accent-fg uppercase transition-all hover:bg-kelly"
            >
              Start your trial
            </Link>
            <a
              href="#services"
              className="border-b border-fg/30 pb-1 text-xs font-semibold tracking-[0.12em] text-fg/75 uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Explore training
            </a>
          </div>
        </div>

        <div className="relative h-[58vh] min-h-115 overflow-hidden rounded-[1.75rem] border border-white/10 lg:h-[72vh] lg:min-h-155">
          <Image
            src="/images/hero-training.jpg"
            alt="Athlete training with battle ropes in a dark gym"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="editorial-image object-cover object-[58%_center]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg/75 via-transparent to-bg/20" />
          <div className="absolute inset-0 bg-linear-to-r from-bg/45 via-transparent to-transparent lg:from-bg/20" />
          <div className="absolute top-6 right-6 rounded-full border border-white/15 bg-bg/30 px-4 py-2 text-[0.62rem] tracking-[0.18em] text-white/70 uppercase backdrop-blur-md">
            Since 2019 · Open daily
          </div>
          <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between border-t border-white/20 pt-5 text-white md:right-8 md:bottom-8 md:left-8">
            <p className="max-w-52 text-sm leading-6 text-white/72">
              Strength is a practice. Build yours with us.
            </p>
            <p className="font-display text-2xl text-accent italic">01</p>
          </div>
        </div>
      </div>

      <div className="relative border-y border-white/8 bg-surface/45">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4 md:px-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-white/8 px-3 py-6 first:pl-0 even:border-l md:border-l md:px-7 md:first:border-l-0"
            >
              <p className="text-2xl font-bold tracking-tight text-fg md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.62rem] tracking-[0.16em] text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
