"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { leaveProgram, startProgram } from "@/app/actions/profile";
import { button } from "@/components/ui/styles";

export default function ProgramActions({ slug, name, isActive, hasOther }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (isActive) {
    return (
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await leaveProgram();
            toast(`Left ${name}`);
          })
        }
        className={button({ variant: "outline", size: "lg" })}
      >
        {pending ? "Leaving…" : "Leave program"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const res = await startProgram(slug);
          if (res?.error) return toast.error(res.error);
          toast.success(`${name} started`, { description: "Your first session is on the Today screen." });
          router.push("/dashboard");
        })
      }
      className={button({ variant: "signal", size: "lg" })}
    >
      {pending ? "Starting…" : hasOther ? `Switch to ${name}` : `Start ${name}`}
    </button>
  );
}
