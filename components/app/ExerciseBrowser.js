"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { input } from "@/components/ui/styles";
import { MUSCLE_GROUPS, demoFrames, exercises } from "@/lib/catalog";

export default function ExerciseBrowser() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter(
      (e) =>
        (group === "All" || e.group === group) &&
        (!q || e.name.toLowerCase().includes(q) || e.equipment.toLowerCase().includes(q) || e.group.toLowerCase().includes(q))
    );
  }, [query, group]);

  return (
    <>
      <div className="sticky top-14 z-10 -mx-4 space-y-3 bg-paper/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-10 lg:px-10">
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, muscle or equipment" aria-label="Search exercises" className={input} />
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {["All", ...MUSCLE_GROUPS].map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
              className={`press h-9 shrink-0 rounded-full px-4 text-sm ${group === g ? "bg-ink text-paper" : "border border-line-strong text-ink-2 hover:border-ink"}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 mb-3 text-sm text-muted" aria-live="polite">
        {list.length} exercise{list.length === 1 ? "" : "s"}
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <li key={e.slug}>
            <Link href={`/exercises/${e.slug}`} className="press flex h-full flex-col overflow-hidden rounded-(--radius-card) border border-line bg-card hover:border-ink/40">
              <div className="relative aspect-[850/569] bg-paper-2">
                <Image src={demoFrames(e.slug)[0]} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow text-signal-deep">{e.group}</p>
              <h2 className="mt-2 text-lg font-semibold">{e.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-ink-2">{e.summary}</p>
              <p className="mt-auto pt-4 text-xs text-muted">
                {e.equipment} · {e.level}
              </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {!list.length ? (
        <div className="rounded-(--radius-card) border border-dashed border-line-strong p-10 text-center">
          <p className="font-semibold">No exercises match “{query}”.</p>
          <button type="button" onClick={() => { setQuery(""); setGroup("All"); }} className="mt-2 text-sm underline underline-offset-4">
            Clear filters
          </button>
        </div>
      ) : null}
    </>
  );
}
