"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { button } from "@/components/ui/styles";
import { demoFrames, exerciseBySlug } from "@/lib/catalog";

// Two-frame movement demo (start → end position) that loops by crossfading.
// The crossfade is a CSS opacity animation (compositor-only). It starts paused
// for people who prefer reduced motion, and frames can always be stepped manually.

export function ExerciseDemo({ slug, size = "lg", autoPlay = true, className = "" }) {
  const exercise = exerciseBySlug[slug];
  const [start, end] = demoFrames(slug);
  const [playing, setPlaying] = useState(autoPlay);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- respect the OS setting once on mount
      setPlaying(false);
    }
  }, []);

  const showEnd = playing ? null : frame === 1;

  return (
    <figure className={className}>
      <div className="relative aspect-[850/569] overflow-hidden rounded-2xl bg-paper-2">
        <Image src={start} alt={`${exercise.name}, start position`} fill sizes={size === "lg" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 512px"} className="object-cover" />
        <Image
          src={end}
          alt={`${exercise.name}, end position`}
          fill
          sizes={size === "lg" ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 512px"}
          className={`object-cover ${playing ? "demo-loop" : `transition-opacity duration-(--duration-ui) ${showEnd ? "opacity-100" : "opacity-0"}`}`}
        />
        <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-2.5 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-paper uppercase backdrop-blur-sm">
          {playing ? "Demo" : showEnd ? "End" : "Start"}
        </span>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div role="group" aria-label="Demo frame" className="flex rounded-full bg-paper-2 p-1 text-sm">
          {["Start", "End"].map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={!playing && frame === i}
              onClick={() => {
                setPlaying(false);
                setFrame(i);
              }}
              className={`press h-8 rounded-full px-3 font-medium ${!playing && frame === i ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setPlaying((p) => !p)} className={button({ variant: "outline", size: "sm" })} aria-pressed={playing}>
          {playing ? "Pause" : "Play demo"}
        </button>
      </figcaption>
    </figure>
  );
}

export function ExerciseThumb({ slug, className = "size-12" }) {
  const [start] = demoFrames(slug);
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-lg bg-paper-2 ${className}`}>
      <Image src={start} alt="" fill sizes="96px" className="object-cover" />
    </span>
  );
}

// Thumbnail + name that opens the demo in a native dialog (focus trap + Esc for free).
export function ExerciseDemoButton({ slug, label, thumbClassName = "size-11", className = "" }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const exercise = exerciseBySlug[slug];

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          dialogRef.current?.showModal();
        }}
        className={`press group flex min-w-0 items-center gap-3 rounded-lg text-left ${className}`}
        aria-label={`Show how to do ${exercise.name}`}
      >
        <span className="relative">
          <ExerciseThumb slug={slug} className={thumbClassName} />
          <span className="absolute right-0.5 bottom-0.5 flex size-4 items-center justify-center rounded-full bg-ink text-paper" aria-hidden="true">
            <svg viewBox="0 0 12 12" className="size-2 fill-current"><path d="M3 2v8l7-4z" /></svg>
          </span>
        </span>
        <span className="min-w-0 truncate group-hover:underline">{label ?? exercise.name}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${exercise.name} demo`}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto mb-0 max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-0 text-ink backdrop:bg-ink/50 open:animate-enter sm:mb-auto sm:rounded-3xl"
      >
        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-signal-deep">{exercise.group} · {exercise.equipment}</p>
              <h2 className="display mt-1 text-4xl">{exercise.name}</h2>
            </div>
            <button type="button" onClick={() => dialogRef.current?.close()} className={button({ variant: "ghost", size: "sm" })}>
              Close
            </button>
          </div>
          {/* Mount the demo only while open so closed dialogs never animate or load full-size images. */}
          {open ? <ExerciseDemo slug={slug} size="sm" /> : null}
          <ol className="mt-5 space-y-2.5">
            {exercise.cues.map((cue, i) => (
              <li key={cue} className="flex gap-3">
                <span className="display tabular text-2xl text-signal">{i + 1}</span>
                <span className="pt-0.5">{cue}</span>
              </li>
            ))}
          </ol>
          <Link href={`/exercises/${slug}`} className={button({ variant: "outline", size: "sm", className: "mt-5" })}>
            Full exercise page
          </Link>
        </div>
      </dialog>
    </>
  );
}
