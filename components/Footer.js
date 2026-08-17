import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-bg px-6 pt-20 pb-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <Image
              src="/images/vitalityfortressmv.png"
              alt="VitalityFortress"
              width={210}
              height={90}
              className="h-12 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-7 text-fg/48">
              A training space for people who want to feel stronger, move
              better, and keep doing both for a long time.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[0.62rem] font-semibold tracking-[0.18em] text-muted uppercase">
              Navigate
            </h3>
            <ul className="space-y-3 text-sm text-fg/68">
              <li><a href="#about" className="transition-colors hover:text-accent">Philosophy</a></li>
              <li><a href="#services" className="transition-colors hover:text-accent">Training</a></li>
              <li><a href="#plan" className="transition-colors hover:text-accent">Membership</a></li>
              <li><a href="#trainers" className="transition-colors hover:text-accent">Coaches</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[0.62rem] font-semibold tracking-[0.18em] text-muted uppercase">
              Visit
            </h3>
            <ul className="space-y-3 text-sm leading-6 text-fg/68">
              <li>Planners Avenue<br />New Port 876</li>
              <li><a href="tel:0262692988" className="hover:text-accent">026 269 2988</a></li>
              <li><a href="mailto:fitnessfortress@email.com" className="hover:text-accent">fitnessfortress@email.com</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/8 pt-7 text-[0.65rem] tracking-[0.08em] text-fg/35 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>&#169; {new Date().getFullYear()} VitalityFortress</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-accent">Contact</Link>
            <a href="#" className="hover:text-accent">Privacy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
