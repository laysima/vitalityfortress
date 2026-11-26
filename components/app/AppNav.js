"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import Logo from "@/components/ui/Logo";

const icons = {
  today: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />,
  programs: <path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h3" />,
  log: <path d="M12 5v14M5 12h14" />,
  classes: <path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" />,
  progress: <path d="M4 19V5M4 19h16M8 15l4-5 3 3 5-6" />,
  library: <path d="M4 5h4v14H4zM10 5h4v14h-4zM16 6l3.5-.8 2.8 13.6-3.5.8z" />,
  history: <path d="M12 7v5l3 2M3.5 12a8.5 8.5 0 1 0 2.5-6M3 4v4h4" />,
};

function Icon({ name, className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const primary = [
  { href: "/dashboard", label: "Today", icon: "today" },
  { href: "/programs", label: "Programs", icon: "programs" },
  { href: "/workouts/new", label: "Log", icon: "log", accent: true },
  { href: "/classes", label: "Classes", icon: "classes" },
  { href: "/progress", label: "Progress", icon: "progress" },
];

const secondary = [
  { href: "/workouts", label: "History", icon: "history" },
  { href: "/exercises", label: "Exercise library", icon: "library" },
];

function isActive(pathname, href) {
  if (href === "/workouts/new") return pathname === href;
  if (href === "/workouts") return pathname === "/workouts" || (pathname.startsWith("/workouts/") && pathname !== "/workouts/new");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav({ user }) {
  const pathname = usePathname();
  const initials = user.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      {/* Desktop sidebar. Navigation is high-frequency: state changes are instant, no motion. */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-paper px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo href="/dashboard" className="text-[1.75rem]" />
        </div>
        <nav aria-label="Member" className="mt-10 flex flex-1 flex-col gap-1">
          {[...primary, ...secondary].map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`press flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium ${
                  active ? "bg-ink text-paper" : "text-ink-2 hover:bg-ink/5 hover:text-ink"
                } ${i === primary.length ? "mt-6" : ""}`}
              >
                <Icon name={item.icon} />
                {item.label === "Log" ? "Log a workout" : item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 border-t border-line px-2 pt-4">
          <span className="flex size-9 items-center justify-center rounded-full bg-signal text-xs font-bold text-ink">{initials}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted">{user.email}</p>
          </div>
          <form action={logout}>
            <button type="submit" className="press rounded-lg px-2 py-1.5 text-xs text-muted hover:bg-ink/5 hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper/90 px-4 backdrop-blur-md lg:hidden">
        <Logo href="/dashboard" className="text-2xl" />
        <div className="flex items-center gap-1">
          {secondary.map((item) => (
            <Link key={item.href} href={item.href} aria-label={item.label} className={`press flex size-10 items-center justify-center rounded-full ${isActive(pathname, item.href) ? "bg-ink text-paper" : "text-ink-2"}`}>
              <Icon name={item.icon} />
            </Link>
          ))}
          <Link href="/dashboard#account" aria-label="Account" className="press flex size-10 items-center justify-center rounded-full bg-signal text-xs font-bold text-ink">
            {initials}
          </Link>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav aria-label="Member" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-2 pt-2 backdrop-blur-md lg:hidden">
        <ul className="mx-auto grid max-w-md grid-cols-5">
          {primary.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`press flex flex-col items-center gap-1 rounded-xl py-1 text-[0.6875rem] font-medium select-none ${active ? "text-ink" : "text-muted"}`}
                >
                  {item.accent ? (
                    <span className="flex size-10 items-center justify-center rounded-full bg-signal text-ink">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                  ) : (
                    <span className={`flex h-10 items-center justify-center`}>
                      <Icon name={item.icon} className={`size-6 ${active ? "stroke-[2.25]" : ""}`} />
                    </span>
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
