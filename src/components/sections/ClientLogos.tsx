"use client";

import Image from "next/image";

type ClientLogo = {
  name: string;
  src: string;
};

const CLIENTS: ClientLogo[] = [
  { name: "Chorus", src: "/logos/logo1.png" },
  { name: "Tauranga City Council", src: "/logos/logo2.png" },
  { name: "The Feel Good Art Club", src: "/logos/logo3.png" },
  { name: "Te Manawa o Pāpāmoa School", src: "/logos/logo4.png" },
  { name: "Te Waka Auaha Toi / Creative Bay of Plenty", src: "/logos/logo5.png" },
  { name: "Koru", src: "/logos/logo6.png" },
];



export default function ClientLogos() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="w-full overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <p className="mb-8 text-center font-body text-sm font-bold uppercase tracking-widest text-ink-soft sm:mb-10 sm:text-base">
        Trusted by
      </p>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
       <div className="animate-marquee flex w-max items-center gap-10 sm:gap-14 lg:gap-16">
          {loop.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="relative h-16 w-44 shrink-0 sm:h-20 sm:w-56 lg:h-24 lg:w-64"
            >
              <Image
                src={client.src}
                alt={client.name}
                fill
                sizes="260px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}