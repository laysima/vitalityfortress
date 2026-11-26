"use client";

import Image from "next/image";
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { bookClass, cancelBooking } from "@/app/actions/classes";
import { button } from "@/components/ui/styles";
import { endTime } from "@/lib/schedule";

function ClassCard({ c, isMine, spotsLeft, onBook, onCancel, pending }) {
  const full = spotsLeft <= 0 && !isMine;
  const low = spotsLeft > 0 && spotsLeft <= 3;

  return (
    <li className={`flex flex-col gap-4 rounded-(--radius-card) border bg-card p-4 sm:flex-row sm:items-center sm:p-5 ${isMine ? "border-good" : "border-line"} ${c.isPast ? "opacity-55" : ""}`}>
      <div className="flex items-center gap-4 sm:w-40 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
        <p className="display tabular text-4xl">{c.time}</p>
        <p className="tabular text-sm text-muted">until {endTime(c.time, c.minutes)}</p>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-ink">
          <Image src={c.coach.image} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{c.title}</p>
          <p className="truncate text-sm text-muted">
            {c.coach.name} · {c.level} · {c.room}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <p className={`tabular text-sm ${full ? "text-signal-deep" : low ? "font-semibold text-signal-deep" : "text-muted"}`}>
          {c.isPast ? "Started" : isMine ? "You're in" : full ? "Full" : `${spotsLeft} of ${c.capacity} left`}
        </p>
        {c.isPast ? null : isMine ? (
          <button type="button" disabled={pending} onClick={onCancel} className={button({ variant: "outline", size: "sm", className: "min-w-24" })}>
            Cancel
          </button>
        ) : (
          <button type="button" disabled={pending || full} onClick={onBook} className={button({ size: "sm", className: "min-w-24" })}>
            {full ? "Full" : "Book"}
          </button>
        )}
      </div>
    </li>
  );
}

export default function ClassSchedule({ days, booked, mine }) {
  const [dayKey, setDayKey] = useState(days[0].key);
  const [pendingId, setPendingId] = useState(null);
  const [, startTransition] = useTransition();
  const [state, apply] = useOptimistic({ booked, mine }, (s, { id, delta }) => ({
    booked: { ...s.booked, [id]: Math.max(0, (s.booked[id] ?? 0) + delta) },
    mine: delta > 0 ? [...s.mine, id] : s.mine.filter((m) => m !== id),
  }));

  const day = days.find((d) => d.key === dayKey) ?? days[0];
  const mySet = new Set(state.mine);

  function run(c, delta) {
    setPendingId(c.id);
    startTransition(async () => {
      apply({ id: c.id, delta });
      const res = delta > 0 ? await bookClass(c.id) : await cancelBooking(c.id);
      setPendingId(null);
      if (res?.error) toast.error(res.error);
      else if (delta > 0) toast.success(`Booked: ${c.title}`, { description: `${day.isToday ? "Today" : `${day.label} ${day.day} ${day.month}`} at ${c.time} with ${c.coach.name}` });
      else toast(`Cancelled ${c.title}`);
    });
  }

  return (
    <div>
      {/* Day picker — selection is instant; this is tapped constantly. */}
      <div role="tablist" aria-label="Day" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {days.map((d) => {
          const selected = d.key === day.key;
          const myCount = d.classes.filter((c) => mySet.has(c.id)).length;
          return (
            <button
              key={d.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setDayKey(d.key)}
              className={`press relative flex w-16 shrink-0 flex-col items-center rounded-2xl py-3 sm:flex-1 ${selected ? "bg-ink text-paper" : "border border-line bg-card text-ink hover:border-ink/40"}`}
            >
              <span className={`text-xs ${selected ? "text-paper/70" : "text-muted"}`}>{d.isToday ? "Today" : d.label}</span>
              <span className="display tabular mt-1 text-3xl">{d.day}</span>
              {myCount ? <span className={`absolute top-2 right-2 size-2 rounded-full ${selected ? "bg-signal" : "bg-good"}`} aria-label={`${myCount} booked`} /> : null}
            </button>
          );
        })}
      </div>

      <ul role="tabpanel" aria-label={`Classes on ${day.label} ${day.day} ${day.month}`} className="mt-6 space-y-3">
        {day.classes.length ? (
          day.classes.map((c) => (
            <ClassCard
              key={c.id}
              c={c}
              isMine={mySet.has(c.id)}
              spotsLeft={c.capacity - (state.booked[c.id] ?? 0)}
              pending={pendingId === c.id}
              onBook={() => run(c, 1)}
              onCancel={() => run(c, -1)}
            />
          ))
        ) : (
          <li className="rounded-(--radius-card) border border-dashed border-line-strong p-10 text-center text-muted">No classes scheduled.</li>
        )}
      </ul>
    </div>
  );
}
