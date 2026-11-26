"use client";

import { useEffect } from "react";

// One IntersectionObserver for every [data-reveal] element on the page.
// Elements already on screen at load are marked visible first, so nothing
// above the fold flickers out and back in when JS arrives.

export default function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const vh = window.innerHeight;

    for (const el of nodes) {
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add("is-visible");
    }
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    nodes.filter((el) => !el.classList.contains("is-visible")).forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
