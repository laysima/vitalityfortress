"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteWorkout } from "@/app/actions/workouts";
import { button } from "@/components/ui/styles";

export default function DeleteWorkoutButton({ id }) {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteWorkout(id);
      if (res?.error) return toast.error(res.error);
      toast("Workout deleted");
      router.push("/workouts");
    });
  }

  return (
    <button type="button" onClick={onClick} disabled={pending} className={button({ variant: "ghost", className: armed ? "bg-signal-soft text-signal-deep" : "text-muted" })}>
      {pending ? "Deleting…" : armed ? "Tap again to delete" : "Delete workout"}
    </button>
  );
}
