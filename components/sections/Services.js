import Image from "next/image";
import Reveal from "@/components/Reveal";

const services = [
  {
    image: "/images/demonstration.png",
    title: "Exercise Demonstrations",
    description:
      "Offering a library of exercise demonstrations, instructional videos, and proper form guidelines.",
  },
  {
    image: "/images/tracking.jpeg",
    title: "Fitness tracking and progress monitoring",
    description:
      "Allowing users to track their workouts, record exercise metrics (such as repetitions, weights, and duration), and monitor their progress over time.",
  },
  {
    image: "/images/coaching.jpeg",
    title: "Expert advice and coaching",
    description:
      "Offering access to fitness professionals, trainers, or coaches who can provide personalized advice, answer user queries, and offer guidance on fitness-related matters.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <span className="mb-1 block text-center font-medium text-accent">
        Offers available
      </span>
      <h2 className="mb-10 text-center text-2xl font-semibold text-title md:text-3xl">
        Our services
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-10">
        {services.map((service) => (
          <Reveal key={service.title} className="text-center">
            <Image
              src={service.image}
              alt=""
              width={200}
              height={160}
              className="mx-auto mb-3 h-40 w-auto rounded-lg object-cover"
            />
            <h3 className="mb-1 text-lg text-title">{service.title}</h3>
            <p className="px-2 text-sm text-fg">{service.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
