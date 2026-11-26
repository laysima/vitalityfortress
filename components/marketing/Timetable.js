import Link from "next/link";
import { classTemplates, coachBySlug } from "@/lib/catalog";
import { endTime } from "@/lib/schedule";
import { Container, SectionHead } from "@/components/marketing/Section";
import { button } from "@/components/ui/styles";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable() {
  return (
    <section id="classes" className="scroll-mt-16 bg-paper-2 py-20 md:py-32">
      <Container>
        <SectionHead
          index="04"
          kicker="Classes"
          title="The week at Pain&Gains."
          intro="Fifteen coached classes every week, from 06:30 strength to Sunday mobility. Members book in the app."
        />

        <div className="mt-14 overflow-hidden rounded-(--radius-card) border border-line bg-card" data-reveal>
          {DAYS.map((day, weekday) => {
            const items = classTemplates.filter((c) => c.weekday === weekday);
            return (
              <div key={day} className="grid border-b border-line last:border-b-0 md:grid-cols-[10rem_1fr]">
                <p className="display bg-paper/60 px-5 pt-4 text-2xl md:py-5 md:text-3xl">{day}</p>
                <ul className="divide-y divide-line md:divide-y-0 md:flex md:flex-wrap">
                  {items.map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-4 px-5 py-4 md:w-1/3 md:flex-col md:items-start md:justify-start md:border-l md:border-line">
                      <div>
                        <p className="tabular text-xs text-muted">
                          {c.time}–{endTime(c.time, c.minutes)}
                        </p>
                        <p className="mt-0.5 font-semibold">{c.title}</p>
                      </div>
                      <p className="text-right text-xs text-muted md:text-left">
                        {coachBySlug[c.coach].name} · {c.level}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <Link href="/classes" className={button({ size: "lg" })}>
            Book a class
          </Link>
        </div>
      </Container>
    </section>
  );
}
