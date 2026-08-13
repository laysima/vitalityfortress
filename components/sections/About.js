import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-28">
        <Reveal className="order-2 flex justify-center sm:order-1">
          <Image
            src="/images/about1.png"
            alt="Members training together"
            width={380}
            height={380}
            className="w-70 sm:w-95"
          />
        </Reveal>

        <Reveal className="order-1 text-center sm:order-2 sm:text-left">
          <span className="mb-1 block font-medium text-accent">About us</span>
          <h2 className="mb-3 text-2xl font-semibold text-title md:text-3xl">
            A community built on strength
          </h2>
          <p className="text-fg">
            Welcome to our fitness page, where we are dedicated to helping you
            embark on a transformative journey towards a healthier and more
            vibrant life. Our mission is to inspire and empower individuals of
            all ages and fitness levels to prioritize their well-being and
            embrace the power of physical fitness.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
