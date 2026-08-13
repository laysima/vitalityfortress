"use client";

import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggle({ className = "" }) {
  const [isCharcoal, setIsCharcoal] = useState(false);

  useEffect(() => {
    // Reflects the class the inline theme-init script (in layout.js) already
    // applied before hydration, so it can't be known during the render pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsCharcoal(document.documentElement.classList.contains("theme-charcoal"));
  }, []);

  function toggleTheme() {
    const next = !isCharcoal;
    setIsCharcoal(next);
    document.documentElement.classList.toggle("theme-charcoal", next);
    localStorage.setItem("theme", next ? "charcoal" : "teal");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`cursor-pointer text-lg text-fg ${className}`}
    >
      {isCharcoal ? <BiSun /> : <BiMoon />}
    </button>
  );
}
