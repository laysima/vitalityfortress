import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/app/PageHeader";
import { button } from "@/components/ui/styles";
import { programs } from "@/lib/catalog";
import { getUser } from "@/lib/dal";

export const metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const user = await getUser();
  const activeSlug = user.activeProgram?.slug;

  return (
    <>
      <PageHeader kicker="Training plans" title="Programs">
        <Link href="/exercises" className={button({ variant: "outline" })}>Exercise library</Link>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((p) => {
          const active = p.slug === activeSlug;
          return (
            <Link key={p.slug} href={`/programs/${p.slug}`} className="zoom-frame press group flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-card">
              <div className="relative aspect-[16/9] overflow-hidden bg-ink">
                <Image src={p.image} alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-90" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
                <p className="display absolute bottom-4 left-5 text-6xl text-paper">{p.name}</p>
                {active ? (
                  <span className="absolute top-4 left-4 rounded-full bg-signal px-3 py-1 text-[0.6875rem] font-semibold tracking-[0.12em] text-ink uppercase">Your program</span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-serif text-xl italic">{p.tagline}</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-3 text-sm">
                  <div><dt className="text-muted">Level</dt><dd className="font-medium">{p.level}</dd></div>
                  <div><dt className="text-muted">Length</dt><dd className="tabular font-medium">{p.weeks} weeks</dd></div>
                  <div><dt className="text-muted">Per week</dt><dd className="tabular font-medium">{p.daysPerWeek} days</dd></div>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
