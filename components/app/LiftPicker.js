"use client";

import { useState } from "react";
import { LiftChart } from "@/components/app/charts";
import { formatWeight } from "@/lib/format";

export default function LiftPicker({ lifts }) {
  const [slug, setSlug] = useState(lifts[0].slug);
  const lift = lifts.find((l) => l.slug === slug) ?? lifts[0];
  const first = lift.points[0].value;
  const last = lift.points.at(-1).value;
  const change = Math.round((last - first) * 10) / 10;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <label htmlFor="lift" className="eyebrow text-muted">Estimated 1RM</label>
          <select
            id="lift"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block rounded-lg border border-line-strong bg-card py-2 pr-8 pl-3 font-semibold"
          >
            {lifts.map((l) => (
              <option key={l.slug} value={l.slug}>{l.name}</option>
            ))}
          </select>
        </div>
        <p className="tabular text-sm">
          <span className={change >= 0 ? "font-semibold text-good" : "font-semibold text-signal-deep"}>
            {change >= 0 ? "+" : "−"}{formatWeight(Math.abs(change))}
          </span>{" "}
          <span className="text-muted">over {lift.points.length} sessions</span>
        </p>
      </div>
      <div className="mt-6">
        <LiftChart key={slug} points={lift.points} />
      </div>
    </div>
  );
}
