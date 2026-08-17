import MaskedHeading from "@/components/MaskedHeading";

export default function Statement() {
  return (
    <section className="border-y border-white/8 bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="mb-8 text-center text-[0.62rem] font-semibold tracking-[0.22em] text-muted uppercase">
          Consistency is the advantage
        </p>
        <MaskedHeading
          text="Do the work"
          tag="h2"
          src="/images/kettlebell-training.jpg"
          align="center"
          weight={700}
          textScale={0.15}
          reveal="rise"
          trigger="view"
          parallax={18}
          duotone={false}
          saturation={0.8}
          brightness={0.95}
          className="font-sans uppercase"
        />
      </div>
    </section>
  );
}
