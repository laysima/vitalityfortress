"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const inputClasses =
  "h-14 w-full rounded-md border border-neutral-300 px-4 text-sm outline-none focus:shadow-[0_1px_0_rgba(0,0,0,0.2)]";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="relative min-h-screen">
      <Image
        src="/images/gym.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute top-[5%] left-[5%] z-10">
        <Link href="/">
          <Image
            src="/images/vitalityfortressmv.png"
            alt="VitalityFortress"
            width={160}
            height={70}
            className="h-17.5 w-auto"
          />
        </Link>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-110 rounded-lg bg-white p-8 shadow-[0_5px_10px_rgba(0,0,0,0.3)]">
          {mode === "login" ? (
            <>
              <h1 className="mb-6 text-center text-lg font-medium text-[#1d2220]">
                Login
              </h1>
              <form className="space-y-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={inputClasses}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={inputClasses}
                />
                <a href="#" className="block text-sm text-[#1d2220] hover:underline">
                  Forgot password?
                </a>
                <button
                  type="button"
                  className="mt-2 h-13 w-full cursor-pointer rounded-md bg-[#1d2220] text-lg font-medium tracking-wide text-white transition-colors hover:bg-black"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-[#1d2220]">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  Signup
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="mb-6 text-center text-lg font-medium text-[#1d2220]">
                Signup
              </h1>
              <form className="space-y-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={inputClasses}
                />
                <input
                  type="password"
                  placeholder="Create a password"
                  className={inputClasses}
                />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className={inputClasses}
                />
                <button
                  type="button"
                  className="mt-2 h-13 w-full cursor-pointer rounded-md bg-[#1d2220] text-lg font-medium tracking-wide text-white transition-colors hover:bg-black"
                >
                  Signup
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-[#1d2220]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
