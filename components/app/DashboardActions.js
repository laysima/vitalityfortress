"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { setWeeklyGoal } from "@/app/actions/profile";
import { loadSampleHistory } from "@/app/actions/workouts";
import { button } from "@/components/ui/styles";

export function GoalStepper({ goal }) {
  const [optimistic, setOptimistic] = useOptimistic(goal);
  const [, startTransition] = useTransition();

  function change(delta) {
    const next = Math.min(7, Math.max(1, optimistic + delta));
    if (next === optimistic) return;
    startTransition(async () => {
      setOptimistic(next);
      const res = await setWeeklyGoal(next);
      if (res?.error) toast.error(res.error);
    });
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Weekly session goal">
      <button type="button" onClick={() => change(-1)} disabled={optimistic <= 1} aria-label="Lower goal" className={button({ variant: "outline", size: "sm", className: "w-9 px-0" })}>
        −
      </button>
      <span className="tabular w-16 text-center text-sm" aria-live="polite">
        Goal <strong className="font-semibold">{optimistic}</strong>
      </span>
      <button type="button" onClick={() => change(1)} disabled={optimistic >= 7} aria-label="Raise goal" className={button({ variant: "outline", size: "sm", className: "w-9 px-0" })}>
        +
      </button>
    </div>
  );
}

export function LoadSampleButton() {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await loadSampleHistory();
          if (res?.error) toast.error(res.error);
          else toast.success(`Added ${res.count} sample sessions`, { description: "Explore your dashboard and progress charts." });
        })
      }
      className={button({ variant: "outline" })}
    >
      {pending ? "Adding sessions…" : "Load sample history"}
    </button>
  );
}
