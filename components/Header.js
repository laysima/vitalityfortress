"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#plan", label: "Plan" },
  { href: "#menu", label: "Products" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY >= 200);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-100 w-full bg-bg transition-shadow ${
        scrolled ? "shadow-[0_2px_4px_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 md:h-18">
        <Image
          src="/images/vitalityfortressmv.png"
          alt="VitalityFortress"
          width={160}
          height={70}
          className="h-17.5 w-auto"
          priority
        />

        <div
          id="nav-menu"
          className={`fixed left-0 w-full rounded-b-2xl bg-bg px-0 pt-6 pb-4 text-center shadow-[0_4px_4px_rgba(0,0,0,0.1)] transition-[top] duration-150 md:static md:flex md:w-auto md:rounded-none md:bg-transparent md:p-0 md:shadow-none ${
            menuOpen ? "top-12" : "-top-full"
          }`}
        >
          <ul className="md:flex md:items-center">
            {links.map((link) => (
              <li key={link.href} className="mb-4 md:mb-0 md:ml-10">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium text-fg transition-colors hover:text-accent ${
                    activeId === link.href.slice(1) ? "text-accent" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mb-4 md:mb-0 md:ml-10">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="font-medium text-fg transition-colors hover:text-accent"
              >
                Join the community
              </Link>
            </li>
            <li className="md:ml-4">
              <ThemeToggle className="absolute top-[1.8rem] right-4 md:static" />
            </li>
          </ul>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="cursor-pointer text-2xl text-fg md:hidden"
        >
          {menuOpen ? <BiX /> : <BiMenu />}
        </button>
      </nav>
    </header>
  );
}
