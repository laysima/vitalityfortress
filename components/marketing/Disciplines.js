import Image from "next/image";
import { Container, SectionHead } from "@/components/marketing/Section";

const items = [
  { title: "Strength", body: "Barbell, dumbbell and kettlebell training with real progression.", image: "/images/about-strength.jpg", alt: "Lifter preparing for a heavy barbell lift", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { title: "Conditioning", body: "Intervals, sleds and carries. Fitness that carries over.", image: "/images/kettlebell-training.jpg", alt: "Athlete swinging a kettlebell in low light", span: "md:col-span-5", ratio: "aspect-[4/3] md:aspect-auto md:h-full" },
  { title: "Coaching", body: "Small groups and one-to-one sessions with eyes on every rep.", image: "/images/coach-airam.jpg", alt: "Coach lifting weights in the gym", span: "md:col-span-5", ratio: "aspect-[4/3] md:aspect-auto md:h-full" },
  { title: "Mobility", body: "Move better the stronger you get, with flows built for lifters.", image: "/images/coach-joshua.jpg", alt: "Athlete holding a dumbbell between sets", span: "md:col-span-7", ratio: "aspect-[4/3]" },
];

export default function Disciplines() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <SectionHead index="03" kicker="Training" title="Four ways in." intro="Everything you need under one roof, and nothing you don't." />
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {items.map((item, i) => (
            <article key={item.title} className={`zoom-frame group flex flex-col ${item.span}`} data-reveal style={{ "--reveal-delay": `${(i % 2) * 70}ms` }}>
              <div className={`relative overflow-hidden rounded-(--radius-card) bg-ink ${item.ratio}`}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 58vw" className="object-cover" />
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <h3 className="display text-4xl">{item.title}</h3>
                <p className="max-w-xs text-right text-sm text-ink-2">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
