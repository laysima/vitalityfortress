import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/strong.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-2xl px-4 text-center">
        <h1 className="text-4xl font-semibold text-accent md:text-6xl">
          SAVOUR THE PAIN
        </h1>
        <h2 className="mt-5 text-xl font-medium text-white md:text-2xl">
          Doing hard things makes you stronger
        </h2>
        <h2 className="text-xl font-medium text-white md:text-2xl">
          CHALLENGE YOURSELF EVERY DAY.
        </h2>
        <a
          href="#menu"
          className="mt-10 inline-block rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent-dark"
        >
          Body building products
        </a>
      </div>
    </section>
  );
}
