"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Philosophy" },
  { href: "#services", label: "Training" },
  { href: "#plan", label: "Membership" },
  { href: "#trainers", label: "Coaches" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY >= 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-100 w-full border-b transition-all duration-500 ${
        scrolled || menuOpen
          ? "border-white/8 bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label="VitalityFortress home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-black tracking-[-0.08em] text-accent-fg shadow-[0_0_28px_rgba(155,234,99,0.18)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            VF
          </span>
          <span className="flex flex-col text-[0.68rem] leading-[0.92] font-bold tracking-[0.18em] text-fg uppercase">
            <span>Vitality</span>
            <span className="mt-1 text-fg/55 transition-colors group-hover:text-accent">
              Fortress
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-xs font-medium tracking-[0.12em] text-fg/65 uppercase transition-colors hover:text-fg"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/login"
          className="hidden rounded-full bg-accent px-6 py-2.5 text-xs font-semibold tracking-[0.12em] text-accent-fg uppercase transition-all hover:bg-kelly md:block"
        >
          Start training
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px bg-fg transition-all duration-300 ${
              menuOpen ? "w-5 -rotate-45 translate-y-0.75" : "w-5"
            }`}
          />
          <span
            className={`h-px bg-fg transition-all duration-300 ${
              menuOpen ? "w-5 rotate-45 -translate-y-0.75" : "w-3.5"
            }`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-bg/95 transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 pb-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-fg/80"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg"
            >
              Start training
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
