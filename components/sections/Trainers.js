"use client";

import Image from "next/image";
import { useState } from "react";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";

const pages = [
  [
    { name: "Andrew Neil", role: "Web Designer", image: "/images/fit1.jpg" },
    { name: "Jasmine Carter", role: "UI Designer", image: "/images/fit2.jpg" },
    { name: "Justin Chung", role: "Web Developer", image: "/images/fit3.jpg" },
  ],
  [
    { name: "Appolo Reef", role: "Web Designer", image: "/images/fit4.jpg" },
    { name: "Adrina Calvo", role: "UI Designer", image: "/images/fit1.jpg" },
    { name: "Nicole Lewis", role: "Web Developer", image: "/images/fit2.jpg" },
  ],
];

function TrainerCard({ trainer }) {
  return (
    <div className="w-full max-w-70 rounded-xl bg-white p-7 text-center text-[#1d2220] shadow-[0_5px_10px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-3">
      <div className="mx-auto mb-3 h-32 w-32 rounded-full bg-[#1d2220] p-[3px]">
        <Image
          src={trainer.image}
          alt={trainer.name}
          width={130}
          height={130}
          className="h-full w-full rounded-full border-2 border-white object-cover"
        />
      </div>
      <div className="text-xl font-medium">{trainer.name}</div>
      <div className="text-lg text-[#1d2220]">{trainer.role}</div>
      <div className="mt-3 flex justify-center gap-2">
        {[BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoYoutube].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-transparent bg-[#1d2220] text-white transition-colors hover:border-[#1d2220] hover:bg-white hover:text-[#1d2220]"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Trainers() {
  const [page, setPage] = useState(0);

  return (
    <section id="menu" className="mx-auto max-w-5xl px-4 py-20 md:py-32">
      <span className="mb-1 block text-center font-medium text-accent">
        Special
      </span>
      <h2 className="mb-10 text-center text-2xl font-semibold text-title md:text-3xl">
        Train with experts
      </h2>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, i) => (
            <div
              key={i}
              className="flex w-full shrink-0 flex-wrap justify-center gap-6 px-1"
            >
              {group.map((trainer) => (
                <TrainerCard key={trainer.name} trainer={trainer} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show trainers page ${i + 1}`}
            onClick={() => setPage(i)}
            className={`h-3.5 cursor-pointer rounded-full bg-white transition-all ${
              page === i ? "w-9" : "w-3.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
