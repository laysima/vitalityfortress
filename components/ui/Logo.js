import Link from "next/link";

// Typeset wordmark: condensed heavy caps, the ampersand in the signal colour.
// `className` controls the size via font-size (e.g. text-2xl).

export default function Logo({ href = "/", tone = "ink", className = "text-2xl" }) {
  return (
    <Link
      href={href}
      aria-label="Pain&Gains home"
      className={`press inline-flex shrink-0 items-baseline font-sans leading-none font-extrabold tracking-[-0.01em] uppercase italic [font-stretch:72%] ${
        tone === "ink" ? "text-ink" : "text-paper"
      } ${className}`}
    >
      Pain<span className="px-[0.04em] text-signal">&amp;</span>Gains
    </Link>
  );
}
