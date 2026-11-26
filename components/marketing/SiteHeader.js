"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import { button } from "@/components/ui/styles";

const links = [
  { href: "/#method", label: "Method" },
  { href: "/#app", label: "The app" },
  { href: "/#classes", label: "Classes" },
  { href: "/#coaches", label: "Coaches" },
  { href: "/#membership", label: "Membership" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-(--duration-ui) ease-(--ease-out) ${
        solid ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 md:h-18 lg:px-10">
        <Logo className="text-2xl md:text-[1.75rem]" />

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-ink-2 transition-colors duration-(--duration-ui) hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className={button({ variant: "ghost", size: "sm" })}>
            Sign in
          </Link>
          <Link href="/login?mode=signup" className={button({ size: "sm" })}>
            Start free
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="press -mr-2 flex size-11 items-center justify-center rounded-full lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-(--duration-ui) ease-(--ease-out) ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-5 bg-ink transition-transform duration-(--duration-ui) ease-(--ease-out) ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* clip-path reveal: a transition, so it reverses cleanly if tapped mid-way. */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`absolute inset-x-0 top-full border-b border-line bg-paper transition-[clip-path] duration-250 ease-(--ease-out) lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 pt-2 pb-6 sm:px-6">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line">
              <a href={l.href} onClick={() => setOpen(false)} className="display block py-4 text-4xl">
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-6 grid grid-cols-2 gap-3">
            <Link href="/login" onClick={() => setOpen(false)} className={button({ variant: "outline", size: "lg" })}>
              Sign in
            </Link>
            <Link href="/login?mode=signup" onClick={() => setOpen(false)} className={button({ size: "lg" })}>
              Start free
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
