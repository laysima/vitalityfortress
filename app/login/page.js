"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const fieldClasses =
  "h-13 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-fg outline-none transition-all placeholder:text-fg/28 hover:border-white/18 focus:border-accent/70 focus:bg-accent/[0.035] focus:ring-3 focus:ring-accent/8";

function Brand() {
  return (
    <Link
      href="/"
      aria-label="VitalityFortress home"
      className="group flex w-fit items-center gap-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-black tracking-[-0.08em] text-accent-fg shadow-[0_0_28px_rgba(155,234,99,0.2)] transition-transform duration-300 group-hover:-rotate-3">
        VF
      </span>
      <span className="flex flex-col text-[0.68rem] leading-[0.92] font-bold tracking-[0.18em] text-fg uppercase">
        <span>Vitality</span>
        <span className="mt-1 text-fg/55 group-hover:text-accent">Fortress</span>
      </span>
    </Link>
  );
}

function Field({ id, label, type = "text", autoComplete, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2.5 block text-xs font-medium text-fg/68">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={fieldClasses}
      />
    </div>
  );
}

function OAuthButton({ children }) {
  return (
    <button
      type="button"
      className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-4 text-xs font-semibold tracking-[0.03em] text-fg/78 transition-all hover:border-white/22 hover:bg-white/[0.065] hover:text-fg"
    >
      {children}
    </button>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg lg:grid lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src="/images/coach-joshua.jpg"
          alt="Athlete training with a dumbbell"
          fill
          priority
          quality={92}
          sizes="55vw"
          className="editorial-image object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/10 to-bg/50" />
        <div className="absolute inset-0 bg-linear-to-r from-accent/10 via-transparent to-bg/45" />
        <div className="absolute inset-0 opacity-[0.06] noise" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
          <Brand />

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-6 text-[0.65rem] font-semibold tracking-[0.22em] text-accent uppercase">
              Train with purpose
            </p>
            <h1 className="text-5xl leading-[0.92] font-black tracking-[-0.055em] text-white uppercase xl:text-7xl">
              Your strongest chapter starts here.
            </h1>
            <div className="mt-8 flex gap-8 border-t border-white/20 pt-6 text-white">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.15em] text-white/50 uppercase">Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.15em] text-white/50 uppercase">Member rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.15em] text-white/50 uppercase">Coaches</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative flex min-h-screen flex-col bg-bg px-6 py-7 sm:px-10 lg:px-12 xl:px-18">
        <div className="absolute -top-40 -right-40 h-100 w-100 rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.025] noise" />

        <div className="relative z-10 flex items-center justify-between lg:justify-end">
          <div className="lg:hidden"><Brand /></div>
          <Link
            href="/"
            className="border-b border-white/18 pb-1 text-[0.65rem] font-semibold tracking-[0.12em] text-fg/55 uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Back home
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-110 flex-1 flex-col justify-center py-14">
          <div
            role="tablist"
            aria-label="Account access"
            className="mb-10 grid grid-cols-2 rounded-full border border-white/10 bg-white/[0.025] p-1"
          >
            {[
              { value: "login", label: "Sign in" },
              { value: "signup", label: "Create account" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={mode === tab.value}
                onClick={() => setMode(tab.value)}
                className={`relative rounded-full px-4 py-2.5 text-xs font-semibold transition-colors ${
                  mode === tab.value ? "text-accent-fg" : "text-fg/48 hover:text-fg"
                }`}
              >
                {mode === tab.value && (
                  <motion.span
                    layoutId="auth-active-tab"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-accent uppercase">
                {isLogin ? "Welcome back" : "Your first step"}
              </p>
              <h2 className="mt-3 text-4xl leading-tight font-semibold tracking-[-0.045em] text-fg sm:text-5xl">
                {isLogin ? "Good to see you again." : "Build your account."}
              </h2>
              <p className="mt-4 text-sm leading-6 text-fg/48">
                {isLogin
                  ? "Sign in to view your program, sessions, and progress."
                  : "Create your profile and book your complimentary first session."}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <OAuthButton>Continue with Google</OAuthButton>
                <OAuthButton>Continue with Apple</OAuthButton>
              </div>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-[0.62rem] tracking-[0.14em] text-fg/30 uppercase">or use email</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
                {!isLogin && (
                  <Field
                    id="name"
                    label="Full name"
                    autoComplete="name"
                    placeholder="Your name"
                  />
                )}
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="mb-2.5 block text-xs font-medium text-fg/68">
                      Password
                    </label>
                    {isLogin && (
                      <button type="button" className="mb-2.5 text-[0.68rem] text-fg/42 transition-colors hover:text-accent">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    placeholder={isLogin ? "Enter your password" : "At least 8 characters"}
                    className={fieldClasses}
                  />
                </div>

                {!isLogin && (
                  <label className="flex items-start gap-3 text-xs leading-5 text-fg/46">
                    <input type="checkbox" required className="mt-1 accent-accent" />
                    <span>
                      I agree to the <a href="#" className="text-fg/72 underline underline-offset-3 hover:text-accent">terms</a> and <a href="#" className="text-fg/72 underline underline-offset-3 hover:text-accent">privacy policy</a>.
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="mt-2 flex h-13 w-full items-center justify-center rounded-xl bg-accent text-xs font-bold tracking-[0.1em] text-accent-fg uppercase transition-all hover:bg-kelly focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
                >
                  {isLogin ? "Sign in" : "Create my account"}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="relative z-10 text-center text-[0.62rem] leading-5 text-fg/28">
          Secure member access · Your information stays private
        </p>
      </section>
    </main>
  );
}
