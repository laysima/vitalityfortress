"use client";

import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY >= 800);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="Scroll to top"
      className={`group fixed right-6 z-50 flex items-center gap-2 text-fg transition-all ${
        visible ? "bottom-8 opacity-100" : "pointer-events-none -bottom-4 opacity-0"
      }`}
    >
      <span className="text-sm tracking-wide">&uarr;</span>
      <span className="border-b border-fg/40 pb-0.5 text-xs tracking-wide text-fg/70 transition-colors group-hover:border-accent group-hover:text-accent">
        Top
      </span>
    </a>
  );
}
