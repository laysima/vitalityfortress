"use client";

import { useActionState, useState } from "react";
import { login, signup } from "@/app/actions/auth";
import { button, input } from "@/components/ui/styles";

function FieldError({ id, errors }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-2 animate-enter text-sm text-signal-deep">
      {errors[0]}
    </p>
  );
}

function Field({ id, label, errors, aside, ...props }) {
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {aside}
      </div>
      <input
        id={id}
        name={id}
        aria-invalid={errors?.length ? true : undefined}
        aria-describedby={errors?.length ? errorId : undefined}
        className={input}
        {...props}
      />
      <FieldError id={errorId} errors={errors} />
    </div>
  );
}

function LoginForm({ next }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-5" noValidate>
      <input type="hidden" name="next" value={next ?? ""} />
      <Field id="email" label="Email" type="email" autoComplete="email" inputMode="email" defaultValue={state?.values?.email ?? ""} errors={state?.errors?.email} required />
      <Field id="password" label="Password" type="password" autoComplete="current-password" errors={state?.errors?.password} required />
      {state?.message ? (
        <p role="alert" className="animate-enter rounded-xl bg-signal-soft px-4 py-3 text-sm text-ink">
          {state.message}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={button({ size: "lg", className: "w-full" })}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function SignupForm({ plan }) {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action} className="space-y-5" noValidate>
      <Field id="name" label="Full name" autoComplete="name" defaultValue={state?.values?.name ?? ""} errors={state?.errors?.name} required />
      <Field id="email" label="Email" type="email" autoComplete="email" inputMode="email" defaultValue={state?.values?.email ?? ""} errors={state?.errors?.email} required />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        errors={state?.errors?.password}
        aside={<span className="text-xs text-muted">8+ characters, a letter and a number</span>}
        required
      />
      {plan ? (
        <p className="rounded-xl bg-paper-2 px-4 py-3 text-sm text-ink-2">
          You picked <strong className="font-semibold capitalize text-ink">{plan}</strong>. We&apos;ll confirm your membership at your free first session.
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={button({ size: "lg", className: "w-full" })}>
        {pending ? "Creating your account…" : "Create account"}
      </button>
      <p className="text-center text-xs text-muted">By creating an account you agree to our terms and privacy policy.</p>
    </form>
  );
}

const TABS = [
  { value: "login", label: "Sign in" },
  { value: "signup", label: "Create account" },
];

export default function AuthForm({ initialMode = "login", next, plan }) {
  const [mode, setMode] = useState(initialMode);
  const isLogin = mode === "login";

  return (
    <div>
      <div role="tablist" aria-label="Account" className="relative mb-10 grid grid-cols-2 rounded-full bg-paper-2 p-1">
        {/* Indicator slides with a transition so rapid toggles retarget instead of restarting. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-(--duration-ui) ease-(--ease-in-out)"
          style={{ transform: isLogin ? "translateX(0)" : "translateX(100%)" }}
        />
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={mode === t.value}
            onClick={() => setMode(t.value)}
            className={`relative z-10 h-10 rounded-full text-sm font-semibold transition-colors duration-(--duration-ui) ${
              mode === t.value ? "text-paper" : "text-ink-2 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div key={mode} className="animate-enter">
        <p className="eyebrow text-signal-deep">{isLogin ? "Welcome back" : "Day one"}</p>
        <h1 className="display mt-3 text-6xl sm:text-7xl">{isLogin ? "Good to see you." : "Let's get started."}</h1>
        <p className="mt-4 mb-8 text-ink-2">
          {isLogin ? "Sign in to see your program, log a session or book a class." : "Create your account to get your program, log your training and book classes."}
        </p>
        {isLogin ? <LoginForm next={next} /> : <SignupForm plan={plan} />}
      </div>
    </div>
  );
}
