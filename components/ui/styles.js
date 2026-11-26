// Shared class recipes so links and buttons look identical.

const base =
  "press inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-45";

const variants = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  signal: "bg-signal text-ink hover:bg-[#ff6236]",
  outline: "border border-line-strong text-ink hover:border-ink",
  ghost: "text-ink hover:bg-ink/6",
  paper: "bg-paper text-ink hover:bg-white",
};

const sizes = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

export function button({ variant = "primary", size = "md", className = "" } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
}

export const card = "rounded-(--radius-card) border border-line bg-card";

export const input =
  "h-12 w-full rounded-xl border border-line-strong bg-card px-4 text-ink outline-none transition-[border-color,box-shadow] duration-(--duration-ui) ease-(--ease-out) placeholder:text-muted/70 hover:border-ink/40 focus:border-ink focus:shadow-[0_0_0_3px_rgb(21_20_18/0.08)] aria-invalid:border-signal-deep";
