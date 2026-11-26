import Image from "next/image";
import { coaches } from "@/lib/catalog";
import { Container, SectionHead } from "@/components/marketing/Section";

export default function Coaches() {
  return (
    <section id="coaches" className="scroll-mt-16 py-20 md:py-32">
      <Container>
        <SectionHead index="05" kicker="Coaches" title="Eyes on every rep." />
        <div className="mt-14 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c, i) => (
            <article key={c.slug} className="zoom-frame" data-reveal style={{ "--reveal-delay": `${i * 60}ms` }}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-(--radius-card) bg-ink">
                <Image src={c.image} alt={`${c.name}, ${c.role} coach`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="mt-4 border-t border-ink pt-3">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="eyebrow mt-1 text-signal-deep">{c.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{c.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
