import Image from "next/image";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";
import Logo from "@/components/ui/Logo";

export const metadata = { title: "Sign in" };

const PLANS = ["essential", "performance", "unlimited"];

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const mode = params.mode === "signup" ? "signup" : "login";
  const next = typeof params.next === "string" ? params.next : undefined;
  const plan = PLANS.includes(params.plan) ? params.plan : undefined;

  return (
    <main className="min-h-dvh lg:grid lg:grid-cols-[1fr_1fr]">
      <section className="relative hidden overflow-hidden bg-ink text-paper lg:block">
        <Image src="/images/coach-joshua.jpg" alt="" fill priority sizes="50vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-10 xl:p-14">
          <Logo tone="paper" className="text-3xl" />
          <div>
            <p className="eyebrow text-signal">Train with purpose</p>
            <p className="display mt-4 max-w-xl text-8xl">Your strongest chapter starts here.</p>
          </div>
        </div>
      </section>

      <section className="flex min-h-dvh flex-col px-4 py-5 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between">
          <div className="lg:invisible">
            <Logo className="text-2xl" />
          </div>
          <Link href="/" className="text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
            Back to site
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <AuthForm initialMode={mode} next={next} plan={plan} />
        </div>
      </section>
    </main>
  );
}
