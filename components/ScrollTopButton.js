"use client";

import { useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/bi";

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY >= 560);
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
      className={`fixed right-4 z-10 flex items-center justify-center rounded-md bg-accent/50 p-1 transition-all hover:bg-accent-dark ${
        visible ? "bottom-6 visible" : "-bottom-20 invisible"
      }`}
    >
      <BiChevronUp className="text-3xl text-bg" />
    </a>
  );
}
