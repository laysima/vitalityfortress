"use client";

import { useId, useMemo, useState } from "react";
import { formatCompact, formatDay, formatNumber } from "@/lib/format";

// Single-series charts: no legend box (the title names the series), signal-colour marks,
// hairline recessive grid, hover/focus tooltips, and a screen-reader table for every chart.

const SERIES = "var(--color-signal)";
const GRID = "var(--color-line)";

function niceMax(value) {
  if (value <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(value));
  const n = value / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function SrTable({ caption, headers, rows }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>{headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export function VolumeChart({ weeks, height = 200, unit = "kg" }) {
  const [active, setActive] = useState(null);
  const width = 640;
  const pad = { top: 16, right: 8, bottom: 26, left: 40 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = niceMax(Math.max(...weeks.map((w) => w.volume)));
  const band = plotW / weeks.length;
  const barW = Math.min(24, band * 0.56);
  const ticks = [0, max / 2, max];
  const y = (v) => pad.top + plotH - (v / max) * plotH;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full overflow-visible" aria-hidden="true">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth="1" />
            <text x={pad.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular">
              {formatCompact(t)}
            </text>
          </g>
        ))}
        {weeks.map((w, i) => {
          const cx = pad.left + band * i + band / 2;
          const h = Math.max(0, plotH - (y(w.volume) - pad.top));
          const r = Math.min(4, h);
          const x0 = cx - barW / 2;
          const top = pad.top + plotH - h;
          return (
            <g key={w.start}>
              {h > 0 ? (
                <path
                  d={`M${x0},${pad.top + plotH} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + barW - r} Q${x0 + barW},${top} ${x0 + barW},${top + r} V${pad.top + plotH} Z`}
                  fill={SERIES}
                  opacity={active === null || active === i ? 1 : 0.45}
                  className="transition-opacity duration-150"
                />
              ) : null}
              <text x={cx} y={height - 6} textAnchor="middle" className={`text-[11px] ${i === weeks.length - 1 ? "fill-ink font-semibold" : "fill-muted"}`}>
                {i === weeks.length - 1 ? "This wk" : w.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hit targets: full-height column per week, larger than the mark. */}
      <div className="absolute inset-0 flex" style={{ paddingLeft: `${(pad.left / width) * 100}%`, paddingRight: `${(pad.right / width) * 100}%` }}>
        {weeks.map((w, i) => (
          <button
            key={w.start}
            type="button"
            tabIndex={0}
            aria-label={`Week of ${w.label}: ${formatNumber(w.volume)} ${unit}, ${w.sessions} sessions`}
            className="h-full flex-1 cursor-default rounded-md focus-visible:outline-offset-0"
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          />
        ))}
      </div>

      {active !== null ? (
        <TooltipFor weeks={weeks} index={active} width={width} height={height} pad={pad} band={band} y={y} unit={unit} />
      ) : null}

      <SrTable
        caption="Training volume per week"
        headers={["Week starting", `Volume (${unit})`, "Sessions"]}
        rows={weeks.map((w) => [w.label, formatNumber(w.volume), w.sessions])}
      />
    </div>
  );
}

function TooltipFor({ weeks, index, width, height, pad, band, y, unit }) {
  const w = weeks[index];
  return (
    <TooltipPercent
      xPct={((pad.left + band * index + band / 2) / width) * 100}
      yPct={(y(w.volume) / height) * 100}
      title={`Week of ${w.label} · ${w.sessions} session${w.sessions === 1 ? "" : "s"}`}
      value={`${formatNumber(w.volume)} ${unit}`}
    />
  );
}

function TooltipPercent({ xPct, yPct, title, value }) {
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-ink px-3 py-2 text-xs whitespace-nowrap text-paper shadow-lg"
      style={{ left: `clamp(70px, ${xPct}%, calc(100% - 70px))`, top: `calc(${yPct}% - 10px)` }}
    >
      <p className="text-paper/60">{title}</p>
      <p className="tabular mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

export function LiftChart({ points, height = 220, unit = "kg" }) {
  const [active, setActive] = useState(null);
  const gradientId = useId();
  const width = 640;
  const pad = { top: 18, right: 16, bottom: 26, left: 44 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const { min, max, coords } = useMemo(() => {
    const values = points.map((p) => p.value);
    const lo = Math.floor((Math.min(...values) * 0.92) / 5) * 5;
    const hi = Math.ceil((Math.max(...values) * 1.04) / 5) * 5 || 5;
    const span = hi - lo || 1;
    const c = points.map((p, i) => ({
      ...p,
      x: pad.left + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW),
      y: pad.top + plotH - ((p.value - lo) / span) * plotH,
    }));
    return { min: lo, max: hi, coords: c };
  }, [points, plotW, plotH, pad.left, pad.top]);

  const ticks = [min, (min + max) / 2, max];
  const yOf = (v) => pad.top + plotH - ((v - min) / (max - min || 1)) * plotH;
  const line = coords.map((c, i) => `${i ? "L" : "M"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const area = `${line} L${coords.at(-1).x},${pad.top + plotH} L${coords[0].x},${pad.top + plotH} Z`;
  const last = coords.at(-1);
  const shown = active ?? null;

  function onMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    let best = 0;
    for (let i = 1; i < coords.length; i += 1) {
      if (Math.abs(coords[i].x - px) < Math.abs(coords[best].x - px)) best = i;
    }
    setActive(best);
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full touch-pan-y overflow-visible"
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
        role="img"
        aria-label={`Estimated one-rep max over ${points.length} sessions, from ${points[0].value} to ${last.value} ${unit}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--color-signal)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={width - pad.right} y1={yOf(t)} y2={yOf(t)} stroke={GRID} strokeWidth="1" />
            <text x={pad.left - 8} y={yOf(t)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular">
              {Math.round(t)}
            </text>
          </g>
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke={SERIES} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {shown !== null ? (
          <line x1={coords[shown].x} x2={coords[shown].x} y1={pad.top} y2={pad.top + plotH} stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1" />
        ) : null}

        {/* End dot + direct label on the latest value; hovered dot when active. */}
        <circle cx={last.x} cy={last.y} r="5" fill={SERIES} stroke="var(--color-card)" strokeWidth="2" />
        {shown !== null && shown !== coords.length - 1 ? (
          <circle cx={coords[shown].x} cy={coords[shown].y} r="5" fill={SERIES} stroke="var(--color-card)" strokeWidth="2" />
        ) : null}
        <text x={last.x - 8} y={last.y - 12} textAnchor="end" className="fill-ink text-[12px] font-semibold tabular">
          {last.value} {unit}
        </text>

        <text x={pad.left} y={height - 6} className="fill-muted text-[11px]">{formatDay(points[0].date)}</text>
        <text x={width - pad.right} y={height - 6} textAnchor="end" className="fill-muted text-[11px]">{formatDay(last.date)}</text>
      </svg>

      {shown !== null ? (
        <TooltipPercent
          xPct={(coords[shown].x / width) * 100}
          yPct={(coords[shown].y / height) * 100}
          title={formatDay(coords[shown].date)}
          value={`${coords[shown].value} ${unit} est. 1RM`}
        />
      ) : null}

      <SrTable
        caption="Estimated one-rep max by session"
        headers={["Date", `Estimated 1RM (${unit})`]}
        rows={points.map((p) => [formatDay(p.date), p.value])}
      />
    </div>
  );
}

// Weekly goal ring — a single headline number with a progress arc.
export function GoalRing({ done, goal, size = 132 }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, goal ? done / goal : 0);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={pct >= 1 ? "var(--color-good)" : SERIES}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          className="transition-[stroke-dashoffset] duration-500 ease-(--ease-out)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="display tabular text-5xl">
          {done}
          <span className="text-2xl text-muted">/{goal}</span>
        </p>
        <p className="eyebrow mt-1 text-muted">sessions</p>
      </div>
    </div>
  );
}
