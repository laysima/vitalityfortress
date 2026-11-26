// Editorial section scaffold: numbered kicker, hairline, headline.

export function SectionHead({ index, kicker, title, intro, className = "" }) {
  return (
    <div className={`grid gap-6 border-t border-ink pt-5 md:grid-cols-[0.4fr_1fr] md:gap-12 ${className}`}>
      <p className="eyebrow flex gap-3" data-reveal>
        <span className="tabular text-signal-deep">{index}</span>
        <span>{kicker}</span>
      </p>
      <div data-reveal style={{ "--reveal-delay": "60ms" }}>
        <h2 className="display text-[clamp(3rem,8vw,6.5rem)]">{title}</h2>
        {intro ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{intro}</p> : null}
      </div>
    </div>
  );
}

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}
