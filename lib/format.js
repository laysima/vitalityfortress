const numberFormat = new Intl.NumberFormat("en-GB");
const compactFormat = new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 });

export function formatNumber(n) {
  return numberFormat.format(Math.round(n));
}

export function formatCompact(n) {
  return compactFormat.format(n);
}

export function formatWeight(kg) {
  const rounded = Math.round(kg * 10) / 10;
  return `${numberFormat.format(rounded)} kg`;
}

export function formatDuration(sec) {
  const minutes = Math.max(1, Math.round(sec / 60));
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function formatClock(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(h ? 2 : 1, "0");
  const ss = String(sec).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function formatDay(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function formatRelativeDay(iso, now = new Date()) {
  const date = new Date(iso);
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = Math.round((startToday - startThat) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff > 1 && diff < 7) return `${diff} days ago`;
  return formatDay(iso);
}

export function formatUpcomingDay(iso, now = new Date()) {
  const date = new Date(iso);
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startThat = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = Math.round((startThat - startToday) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

export function firstName(name = "") {
  return name.trim().split(/\s+/)[0] || "there";
}

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
