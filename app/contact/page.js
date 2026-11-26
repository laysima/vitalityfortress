import Image from "next/image";
import ContactForm from "@/components/marketing/ContactForm";
import SiteFooter from "@/components/marketing/SiteFooter";
import SiteHeader from "@/components/marketing/SiteHeader";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 lg:px-10">
        <div className="border-t border-ink pt-5">
          <p className="eyebrow text-signal-deep">Contact</p>
          <h1 className="display mt-4 text-[clamp(4rem,12vw,10rem)]">Let&apos;s talk.</h1>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <ContactForm />

          <aside className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-card) bg-ink">
              <Image src="/images/gym-dumbbells.jpg" alt="Dumbbell rack on the gym floor" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
            <dl className="grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
              <div>
                <dt className="eyebrow text-muted">Visit</dt>
                <dd className="mt-2">Planners Avenue<br />New Port 876</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Call</dt>
                <dd className="mt-2"><a href="tel:0262692988" className="underline underline-offset-4">026 269 2988</a></dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Hours</dt>
                <dd className="mt-2">Mon–Fri 06:00–21:00<br />Sat–Sun 08:00–14:00</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Reply time</dt>
                <dd className="mt-2">Within one working day</dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
