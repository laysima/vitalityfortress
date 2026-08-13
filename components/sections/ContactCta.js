import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ContactCta() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <Reveal className="grid gap-6 text-center sm:grid-cols-[1.75fr_1fr] sm:items-center sm:text-left">
        <div>
          <span className="mb-1 block font-medium text-accent">
            Let&apos;s talk
          </span>
          <h2 className="mb-3 text-2xl font-semibold text-title md:text-3xl">
            Contact us
          </h2>
          <p className="text-fg">
            Want to reserve a spot at our fitness classes? Chat with us 24/7
            and we&apos;ll help you quickly.
          </p>
        </div>

        <div className="justify-self-center">
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent-dark"
          >
            Contact us now
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
