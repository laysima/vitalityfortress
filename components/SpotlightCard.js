"use client";

import { useRef } from "react";

export default function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);

  function moveSpotlight(event) {
    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={moveSpotlight}
      className={`spotlight-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
