// Static skeleton: shown instantly on navigation while the server reads MongoDB.
// No shimmer loop — this appears constantly, and motion here would only add noise.

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-[fade_300ms_ease_150ms_both]">
      <div className="mb-10 border-b border-ink pb-5">
        <div className="h-3 w-28 rounded bg-ink/8" />
        <div className="mt-4 h-14 w-2/3 max-w-md rounded-lg bg-ink/8" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="h-72 rounded-(--radius-card) bg-ink/6" />
        <div className="h-72 rounded-(--radius-card) bg-ink/6" />
      </div>
    </div>
  );
}
