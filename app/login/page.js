"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const fieldClasses =
  "peer w-full border-0 border-b border-fg/25 bg-transparent py-3 text-fg outline-none focus:border-accent";
const labelClasses =
  "pointer-events-none absolute top-3 left-0 text-fg/40 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:text-xs peer-focus:text-accent peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-xs";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 mx-auto max-w-[1920px]">
        <Image
          src="/images/gym-floor-wide.jpg"
          alt=""
          fill
          priority
          sizes="1920px"
          quality={92}
          className="editorial-image object-cover"
        />
        <div className="absolute inset-0 bg-bg/88" />
      </div>

      <div className="absolute top-8 left-6 z-10 md:top-10 md:left-10">
        <Link href="/">
          <Image
            src="/images/vitalityfortressmv.png"
            alt="VitalityFortress"
            width={160}
            height={70}
            className="h-9 w-auto opacity-95"
          />
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex gap-8">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`font-display text-2xl italic transition-colors ${
                mode === "login" ? "text-accent" : "text-fg/30"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`font-display text-2xl italic transition-colors ${
                mode === "signup" ? "text-accent" : "text-fg/30"
              }`}
            >
              Signup
            </button>
          </div>

          {mode === "login" ? (
            <form className="space-y-8">
              <div className="relative">
                <input type="email" required placeholder=" " className={fieldClasses} />
                <label className={labelClasses}>Email</label>
              </div>
              <div className="relative">
                <input type="password" required placeholder=" " className={fieldClasses} />
                <label className={labelClasses}>Password</label>
              </div>
              <a href="#" className="block text-sm text-fg/40 hover:text-accent">
                Forgot password?
              </a>
              <button
                type="button"
                className="group mt-2 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-fg transition-transform hover:scale-105"
              >
                Login
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </form>
          ) : (
            <form className="space-y-8">
              <div className="relative">
                <input type="email" required placeholder=" " className={fieldClasses} />
                <label className={labelClasses}>Email</label>
              </div>
              <div className="relative">
                <input type="password" required placeholder=" " className={fieldClasses} />
                <label className={labelClasses}>Create a password</label>
              </div>
              <div className="relative">
                <input type="password" required placeholder=" " className={fieldClasses} />
                <label className={labelClasses}>Confirm password</label>
              </div>
              <button
                type="button"
                className="group mt-2 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-fg transition-transform hover:scale-105"
              >
                Signup
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
