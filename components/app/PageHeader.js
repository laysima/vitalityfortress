export default function PageHeader({ kicker, title, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-ink pb-5 sm:flex-row sm:items-end sm:justify-between md:mb-10">
      <div>
        {kicker ? <p className="eyebrow text-signal-deep">{kicker}</p> : null}
        <h1 className="display mt-2 text-6xl md:text-7xl">{title}</h1>
      </div>
      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}
