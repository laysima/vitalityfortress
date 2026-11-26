"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveWorkout } from "@/app/actions/workouts";
import { ExerciseDemoButton } from "@/components/app/ExerciseDemo";
import { button, input } from "@/components/ui/styles";
import { MUSCLE_GROUPS, exerciseBySlug, exercises as catalog } from "@/lib/catalog";
import { formatClock, formatNumber } from "@/lib/format";
import { freshExercise, makeKey as key } from "@/lib/logger";
import { completedSets, workoutVolume } from "@/lib/stats";

const DRAFT_KEY = "pg-workout-draft-v1";

// Rest is stored as an end timestamp so it stays correct if the tab is backgrounded.
const restFor = (seconds) => ({ endsAt: Date.now() + seconds * 1000, total: seconds });

function readDraft() {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeDraft(draft) {
  try {
    if (draft) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable: the session still works, it just won't survive a reload */
  }
}

/* ───────────── Elapsed clock: re-renders itself only ───────────── */

function Elapsed({ startedAt }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular">{formatClock((now - new Date(startedAt).getTime()) / 1000)}</span>;
}

/* ───────────── Rest timer sheet ───────────── */

function RestTimer({ rest, onChange, onDone }) {
  const [now, setNow] = useState(() => Date.now());
  const open = Boolean(rest);
  const remaining = rest ? Math.max(0, Math.ceil((rest.endsAt - now) / 1000)) : 0;
  const firedRef = useRef(null);

  useEffect(() => {
    if (!rest) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [rest]);

  useEffect(() => {
    if (rest && remaining === 0 && firedRef.current !== rest.endsAt) {
      firedRef.current = rest.endsAt;
      try {
        navigator.vibrate?.([120, 60, 120]);
      } catch {
        /* vibration not supported */
      }
      onDone();
    }
  }, [rest, remaining, onDone]);

  const pct = rest ? Math.min(1, remaining / rest.total) : 0;

  return (
    <div
      inert={!open}
      aria-hidden={!open}
      // Drawer-style entrance: transform-only transition with the iOS-like curve; interruptible.
      className={`fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 px-4 transition-[transform,opacity] duration-(--duration-drawer) ease-(--ease-drawer) lg:bottom-6 lg:left-64 ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0"
      }`}
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-ink text-paper shadow-2xl" role="timer" aria-live="off">
        <div className="h-1 bg-paper/10">
          <div className="h-full origin-left bg-signal transition-transform duration-300 ease-linear" style={{ transform: `scaleX(${pct})` }} />
        </div>
        <div className="flex items-center gap-3 p-3 pl-5">
          <div className="flex-1">
            <p className="eyebrow text-paper/60">Rest</p>
            <p className="display tabular text-4xl">{formatClock(remaining)}</p>
          </div>
          <button type="button" onClick={() => onChange(-15)} className="press h-10 rounded-full bg-paper/10 px-3 text-sm font-semibold hover:bg-paper/15" aria-label="Remove 15 seconds">
            −15
          </button>
          <button type="button" onClick={() => onChange(15)} className="press h-10 rounded-full bg-paper/10 px-3 text-sm font-semibold hover:bg-paper/15" aria-label="Add 15 seconds">
            +15
          </button>
          <button type="button" onClick={() => onChange(null)} className="press h-10 rounded-full bg-signal px-4 text-sm font-semibold text-ink">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Exercise picker (native dialog: focus trap + Esc for free) ───────────── */

function ExercisePicker({ dialogRef, onPick, exclude }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter(
      (e) => (group === "All" || e.group === group) && (!q || e.name.toLowerCase().includes(q) || e.equipment.toLowerCase().includes(q))
    );
  }, [query, group]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Add exercise"
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
      className="m-auto mb-0 max-h-[85dvh] w-full max-w-lg overflow-hidden rounded-t-3xl bg-card p-0 text-ink backdrop:bg-ink/40 open:animate-enter sm:mb-auto sm:rounded-3xl"
    >
      <div className="flex max-h-[85dvh] flex-col">
        <div className="space-y-3 border-b border-line p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add exercise</h2>
            <button type="button" onClick={() => dialogRef.current?.close()} className={button({ variant: "ghost", size: "sm" })}>
              Close
            </button>
          </div>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search exercises" aria-label="Search exercises" className={input} />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {["All", ...MUSCLE_GROUPS].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                aria-pressed={group === g}
                className={`press h-8 shrink-0 rounded-full px-3 text-sm ${group === g ? "bg-ink text-paper" : "bg-paper-2 text-ink-2"}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto overscroll-contain p-2">
          {list.map((e) => (
            <li key={e.slug}>
              <button
                type="button"
                onClick={() => {
                  onPick(e.slug);
                  dialogRef.current?.close();
                  setQuery("");
                }}
                className="press flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left hover:bg-paper-2"
              >
                <span>
                  <span className="block font-medium">{e.name}</span>
                  <span className="text-sm text-muted">
                    {e.group} · {e.equipment}
                  </span>
                </span>
                {exclude.has(e.slug) ? <span className="text-xs text-muted">In workout</span> : <span className="text-xl text-muted">+</span>}
              </button>
            </li>
          ))}
          {!list.length ? <li className="p-6 text-center text-muted">No exercises match “{query}”.</li> : null}
        </ul>
      </div>
    </dialog>
  );
}

/* ───────────── Set row ───────────── */

function SetRow({ index, set, tracksWeight, previous, onChange, onToggle }) {
  return (
    <div
      className={`grid items-center gap-2 rounded-xl px-1 py-1 transition-colors duration-(--duration-ui) ${set.done ? "bg-good-soft" : ""} ${
        tracksWeight ? "grid-cols-[1.75rem_1fr_4.5rem_4.5rem_2.75rem]" : "grid-cols-[1.75rem_1fr_4.5rem_2.75rem]"
      }`}
    >
      <span className="tabular text-center text-sm text-muted">{index + 1}</span>
      <span className="tabular truncate text-sm text-muted">{previous ? `${tracksWeight ? `${previous.weight} × ` : ""}${previous.reps}` : "—"}</span>
      {tracksWeight ? (
        <input
          type="text"
          inputMode="decimal"
          aria-label={`Set ${index + 1} weight in kg`}
          value={set.weight}
          onChange={(e) => onChange({ weight: e.target.value.replace(/[^0-9.]/g, "") })}
          onFocus={(e) => e.target.select()}
          placeholder="kg"
          className="tabular h-10 w-full rounded-lg border border-line bg-card px-2 text-center font-medium outline-none focus:border-ink"
        />
      ) : null}
      <input
        type="text"
        inputMode="numeric"
        aria-label={`Set ${index + 1} reps`}
        value={set.reps}
        onChange={(e) => onChange({ reps: e.target.value.replace(/[^0-9]/g, "") })}
        onFocus={(e) => e.target.select()}
        placeholder="reps"
        className="tabular h-10 w-full rounded-lg border border-line bg-card px-2 text-center font-medium outline-none focus:border-ink"
      />
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={set.done}
          aria-label={set.done ? `Undo set ${index + 1}` : `Complete set ${index + 1}`}
          className={`press flex size-10 items-center justify-center rounded-lg ${set.done ? "bg-good text-white" : "border border-line-strong bg-card text-transparent hover:text-muted"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-5" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ───────────── Logger ───────────── */

export default function WorkoutLogger({ initial, previous }) {
  const router = useRouter();
  const pickerRef = useRef(null);
  const [workout, setWorkout] = useState(initial);
  const [restoredFrom, setRestoredFrom] = useState(null);
  const [rest, setRest] = useState(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [saving, startSaving] = useTransition();
  const hydrated = useRef(false);

  // Restore an unfinished session after a reload (per-device convenience only).
  useEffect(() => {
    const draft = readDraft();
    if (draft?.exercises?.length && (!initial.programSlug || draft.programSlug === initial.programSlug)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from browser storage after mount
      setWorkout(draft);
      setRestoredFrom(draft.startedAt);
    }
    hydrated.current = true;
  }, [initial.programSlug]);

  useEffect(() => {
    if (hydrated.current) writeDraft(workout);
  }, [workout]);

  const volume = workoutVolume(workout.exercises);
  const done = completedSets(workout.exercises);
  const total = workout.exercises.reduce((n, e) => n + e.sets.length, 0);

  function updateExercise(exKey, fn) {
    setWorkout((w) => ({ ...w, exercises: w.exercises.map((e) => (e.key === exKey ? fn(e) : e)) }));
  }

  function toggleSet(ex, setKey) {
    const nowDone = !ex.sets.find((s) => s.key === setKey)?.done;
    updateExercise(ex.key, (e) => ({
      ...e,
      sets: e.sets.map((s) =>
        s.key === setKey ? { ...s, done: nowDone, reps: s.reps === "" ? 0 : s.reps, weight: s.weight === "" ? 0 : s.weight } : s
      ),
    }));
    // Starting the timer is the response to the tap: it appears immediately.
    if (nowDone) setRest(restFor(ex.rest));
  }

  function addSet(ex) {
    updateExercise(ex.key, (e) => {
      const last = e.sets.at(-1);
      return { ...e, sets: [...e.sets, { key: key(), weight: last?.weight ?? "", reps: last?.reps ?? 8, done: false }] };
    });
  }

  function addExercise(slug) {
    setWorkout((w) => ({ ...w, exercises: [...w.exercises, freshExercise(slug, {}, previous[slug])] }));
  }

  function removeExercise(exKey) {
    setWorkout((w) => ({ ...w, exercises: w.exercises.filter((e) => e.key !== exKey) }));
  }

  function adjustRest(delta) {
    if (delta === null) return setRest(null);
    setRest((r) => (r ? { ...r, endsAt: Math.max(Date.now(), r.endsAt + delta * 1000), total: Math.max(15, r.total + delta) } : r));
  }

  function discard() {
    if (!confirmDiscard) {
      setConfirmDiscard(true);
      setTimeout(() => setConfirmDiscard(false), 3000);
      return;
    }
    writeDraft(null);
    router.push("/dashboard");
  }

  function finish() {
    if (!done) {
      toast.error("Complete at least one set first", { description: "Tick the box at the end of a set once it's done." });
      return;
    }
    startSaving(async () => {
      const payload = {
        name: workout.name.trim() || "Workout",
        programSlug: workout.programSlug ?? null,
        programDay: workout.programDay ?? null,
        startedAt: workout.startedAt,
        notes: workout.notes ?? "",
        exercises: workout.exercises.map((e) => ({
          slug: e.slug,
          sets: e.sets.map((s) => ({ weight: Number(s.weight) || 0, reps: Number(s.reps) || 0, done: s.done })),
        })),
      };
      const res = await saveWorkout(payload);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      writeDraft(null);
      router.push(`/workouts/${res.id}?done=1`);
    });
  }

  const inWorkout = new Set(workout.exercises.map((e) => e.slug));

  return (
    <div className="pb-24">
      {/* Session header */}
      <div className="sticky top-14 z-20 -mx-4 mb-6 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-10 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-signal-deep">
              In progress · <Elapsed startedAt={workout.startedAt} />
            </p>
            <p className="tabular mt-0.5 text-sm text-muted">
              {done}/{total} sets · {formatNumber(volume)} kg
            </p>
          </div>
          <button type="button" onClick={finish} disabled={saving} className={button({ variant: "signal" })}>
            {saving ? "Saving…" : "Finish"}
          </button>
        </div>
      </div>

      {restoredFrom ? (
        <div className="mb-6 flex animate-enter items-center justify-between gap-4 rounded-xl bg-paper-2 px-4 py-3 text-sm">
          <span>Picked up your unfinished session.</span>
          <button
            type="button"
            className="font-semibold underline underline-offset-4"
            onClick={() => {
              writeDraft(null);
              setWorkout(initial);
              setRestoredFrom(null);
            }}
          >
            Start over
          </button>
        </div>
      ) : null}

      <label htmlFor="workout-name" className="sr-only">Workout name</label>
      <input
        id="workout-name"
        value={workout.name}
        onChange={(e) => setWorkout((w) => ({ ...w, name: e.target.value }))}
        className="display w-full bg-transparent text-5xl outline-none placeholder:text-muted/50 md:text-6xl"
        placeholder="Workout name"
        maxLength={80}
      />

      <div className="mt-6 space-y-4">
        {workout.exercises.map((ex) => {
          const meta = exerciseBySlug[ex.slug];
          const prev = previous[ex.slug];
          return (
            <section key={ex.key} className="animate-enter rounded-(--radius-card) border border-line bg-card p-4 md:p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <ExerciseDemoButton slug={ex.slug} className="text-lg font-semibold" thumbClassName="size-12" />
                  <p className="mt-1 text-sm text-muted">
                    {meta.group} · Rest {formatClock(ex.rest)}
                  </p>
                </div>
                <button type="button" onClick={() => removeExercise(ex.key)} className={button({ variant: "ghost", size: "sm", className: "text-muted" })} aria-label={`Remove ${meta.name}`}>
                  Remove
                </button>
              </div>

              <div className={`grid gap-2 px-1 pb-1 text-[0.6875rem] font-semibold tracking-[0.1em] text-muted uppercase ${meta.tracksWeight ? "grid-cols-[1.75rem_1fr_4.5rem_4.5rem_2.75rem]" : "grid-cols-[1.75rem_1fr_4.5rem_2.75rem]"}`}>
                <span className="text-center">Set</span>
                <span>Last time</span>
                {meta.tracksWeight ? <span className="text-center">kg</span> : null}
                <span className="text-center">Reps</span>
                <span className="text-right">Done</span>
              </div>
              <div className="space-y-1">
                {ex.sets.map((s, i) => (
                  <SetRow
                    key={s.key}
                    index={i}
                    set={s}
                    tracksWeight={meta.tracksWeight}
                    previous={prev?.[i]}
                    onChange={(patch) => updateExercise(ex.key, (e) => ({ ...e, sets: e.sets.map((x) => (x.key === s.key ? { ...x, ...patch } : x)) }))}
                    onToggle={() => toggleSet(ex, s.key)}
                  />
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={() => addSet(ex)} className={button({ variant: "outline", size: "sm" })}>
                  + Add set
                </button>
                {ex.sets.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => updateExercise(ex.key, (e) => ({ ...e, sets: e.sets.slice(0, -1) }))}
                    className={button({ variant: "ghost", size: "sm", className: "text-muted" })}
                  >
                    Remove last
                  </button>
                ) : null}
              </div>
            </section>
          );
        })}

        <button
          type="button"
          onClick={() => pickerRef.current?.showModal()}
          className="press flex h-16 w-full items-center justify-center rounded-(--radius-card) border border-dashed border-line-strong text-sm font-semibold text-ink-2 hover:border-ink hover:text-ink"
        >
          + Add exercise
        </button>

        <div>
          <label htmlFor="notes" className="mb-2 block text-sm font-medium">Notes</label>
          <textarea
            id="notes"
            rows={3}
            value={workout.notes ?? ""}
            onChange={(e) => setWorkout((w) => ({ ...w, notes: e.target.value }))}
            placeholder="How did it feel? Anything to change next time?"
            className={`${input} h-auto resize-y py-3`}
            maxLength={1000}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
          <button type="button" onClick={discard} className={button({ variant: "ghost", className: confirmDiscard ? "bg-signal-soft text-signal-deep" : "text-muted" })}>
            {confirmDiscard ? "Tap again to discard" : "Discard workout"}
          </button>
          <button type="button" onClick={finish} disabled={saving} className={button({ size: "lg" })}>
            {saving ? "Saving…" : "Finish workout"}
          </button>
        </div>
      </div>

      <ExercisePicker dialogRef={pickerRef} onPick={addExercise} exclude={inWorkout} />
      <RestTimer
        rest={rest}
        onChange={adjustRest}
        onDone={() => {
          setRest(null);
          toast("Rest over", { description: "Time for your next set." });
        }}
      />
    </div>
  );
}

