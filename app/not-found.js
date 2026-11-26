import Link from "next/link";
import { button } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-4 py-20">
      <p className="eyebrow text-signal-deep">404</p>
      <h1 className="display mt-4 text-[clamp(4.5rem,16vw,11rem)]">Missed rep.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-2">That page doesn&apos;t exist, or it moved. Reset and go again.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={button({ size: "lg" })}>Home</Link>
        <Link href="/dashboard" className={button({ variant: "outline", size: "lg" })}>Dashboard</Link>
      </div>
    </main>
  );
}
