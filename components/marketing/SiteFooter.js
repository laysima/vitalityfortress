import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { button } from "@/components/ui/styles";

export function FinalCta() {
  return (
    <section className="bg-signal text-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-10" data-reveal>
        <p className="eyebrow">Your first session is on us</p>
        <h2 className="display mt-6 text-[clamp(3.75rem,13vw,11rem)]">Ready when you are.</h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/contact" className={button({ size: "lg" })}>
            Book a free session
          </Link>
          <Link href="/login?mode=signup" className={button({ variant: "outline", size: "lg", className: "border-ink/40" })}>
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Logo tone="paper" className="text-4xl" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
              A training space for people who want to feel stronger, move better and keep doing both for a long time.
            </p>
          </div>
          <div>
            <h3 className="eyebrow text-paper/50">Train</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/#method" className="hover:text-signal">Method</Link></li>
              <li><Link href="/#classes" className="hover:text-signal">Classes</Link></li>
              <li><Link href="/#coaches" className="hover:text-signal">Coaches</Link></li>
              <li><Link href="/#membership" className="hover:text-signal">Membership</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-paper/50">Members</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/dashboard" className="hover:text-signal">Dashboard</Link></li>
              <li><Link href="/programs" className="hover:text-signal">Programs</Link></li>
              <li><Link href="/exercises" className="hover:text-signal">Exercise library</Link></li>
              <li><Link href="/login" className="hover:text-signal">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-paper/50">Visit</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/80">
              <li>Planners Avenue<br />New Port 876</li>
              <li><a href="tel:0262692988" className="hover:text-signal">026 269 2988</a></li>
              <li><Link href="/contact" className="hover:text-signal">Contact us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Pain&amp;Gains</p>
          <Link href="/contact" className={button({ variant: "paper", size: "sm", className: "w-fit" })}>
            Book a free session
          </Link>
        </div>
      </div>
    </footer>
  );
}
