"use client";

import { useId } from "react";

export default function CircularText({ text, diameter = 160, className = "" }) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = `circular-text-${rawId}`;
  const radius = diameter / 2 - 14;
  const center = diameter / 2;

  const path = `M ${center - radius}, ${center} a ${radius},${radius} 0 1,1 ${
    radius * 2
  },0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <div
      className={`animate-spin-slow ${className}`}
      style={{ width: diameter, height: diameter }}
    >
      <svg viewBox={`0 0 ${diameter} ${diameter}`} className="h-full w-full">
        <defs>
          <path id={id} d={path} />
        </defs>
        <text className="fill-current text-[11px] font-semibold tracking-[0.25em] uppercase">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
