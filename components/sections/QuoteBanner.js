import Image from "next/image";

export default function QuoteBanner() {
  return (
    <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
      <Image
        src="/images/gym2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <p className="relative z-10 max-w-2xl px-6 text-center text-xl font-medium text-white md:text-3xl">
        Strength doesn&apos;t come from what you can do. It comes from
        overcoming the things you once thought you couldn&apos;t.
      </p>
    </section>
  );
}
