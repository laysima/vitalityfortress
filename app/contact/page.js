import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Contact us | VitalityFortress",
};

function Field({ label, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        required
        placeholder=" "
        className="peer w-full border-0 border-b border-fg/25 bg-transparent py-3 text-fg outline-none focus:border-accent"
      />
      <label className="pointer-events-none absolute top-3 left-0 text-fg/40 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-accent peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-xs">
        {label}
      </label>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 mx-auto max-w-[1920px]">
        <Image
          src="/images/gym-dumbbells.jpg"
          alt=""
          fill
          priority
          sizes="1920px"
          quality={92}
          className="editorial-image object-cover"
        />
        <div className="absolute inset-0 bg-bg/88" />
      </div>

      <div className="absolute top-8 left-6 z-10 md:top-10 md:left-10">
        <Link href="/">
          <Image
            src="/images/vitalityfortressmv.png"
            alt="VitalityFortress"
            width={160}
            height={70}
            className="h-9 w-auto opacity-95"
          />
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-xl">
          <p className="mb-3 font-display text-2xl text-accent italic">
            Let&apos;s talk
          </p>
          <h1 className="mb-12 font-display text-4xl font-medium text-fg sm:text-5xl">
            Contact us
          </h1>

          <form className="space-y-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <Field label="First name" />
              <Field label="Last name" />
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <Field label="Email address" type="email" />
              <Field label="Problem domain" />
            </div>

            <div className="relative">
              <textarea
                required
                placeholder=" "
                rows={4}
                className="peer w-full resize-none border-0 border-b border-fg/25 bg-transparent py-3 text-fg outline-none focus:border-accent"
              />
              <label className="pointer-events-none absolute top-3 left-0 text-fg/40 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-accent peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-xs">
                Your message
              </label>
            </div>

            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-fg transition-transform hover:scale-105"
            >
              Send message
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
