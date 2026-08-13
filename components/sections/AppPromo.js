import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function AppPromo() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-28">
        <Reveal className="text-center sm:text-left">
          <span className="mb-1 block font-medium text-accent">App</span>
          <h2 className="mb-3 text-2xl font-semibold text-title md:text-3xl">
            App is available
          </h2>
          <p className="mb-8 text-fg">
            Explore our cutting-edge fitness website! Discover our
            user-friendly application and unlock a world of possibilities. By
            downloading our app, you gain access to a wide range of features
            and benefits.
          </p>
          <div className="mb-8 flex justify-center gap-2 sm:justify-start">
            <a href="#">
              <Image
                src="/images/app1.png"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="w-30"
              />
            </a>
            <a href="#">
              <Image
                src="/images/app2.png"
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="w-30"
              />
            </a>
          </div>
        </Reveal>

        <Reveal className="flex justify-center">
          <Image
            src="/images/fitnessimage.png"
            alt="VitalityFortress app preview"
            width={230}
            height={460}
            className="w-58"
          />
        </Reveal>
      </div>
    </section>
  );
}
