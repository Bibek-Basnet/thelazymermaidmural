"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Service = {
  slug: string;
  title: string;
  description: string;
  image: string;
  squiggleColor: string; // hex, matches brand palette
};

const SERVICES: Service[] = [
  {
    slug: "public-art",
    title: "Public art",
    description: "Large-scale council and community commissions.",
    image: "/services/mural1.jpeg",
    squiggleColor: "#FFB162", // mango
  },
  {
    slug: "commercial-murals",
    title: "Commercial murals",
    description: "Bold branded artwork for shops, cafes, and businesses.",
    image: "/services/mural4.jpeg",
    squiggleColor: "#D93E87", // magenta
  },
  {
    slug: "community-projects",
    title: "Community projects",
    description: "Created together with local youth and residents.",
    image: "/services/mural5.jpeg",
    squiggleColor: "#5EC1CF", // lagoon
  },
  {
    slug: "school-artwork",
    title: "School artwork",
    description: "Playful, colourful pieces made for young minds.",
    image: "/services/mural3.jpeg",
    squiggleColor: "#F09580", // coral
  },
  {
    slug: "interactive-artwork",
    title: "Interactive artwork",
    description: "Floor games and hands-on pieces people can play with.",
    image: "/services/mural2.jpeg",
    squiggleColor: "#FFB162",
  },
  {
    slug: "branded-spaces",
    title: "Branded spaces",
    description: "Full interior and exterior identity through paint.",
    image: "/services/mural6.jpeg",
    squiggleColor: "#D93E87",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ServiceTile({ service }: { service: Service }) {
  const squiggleRef = useRef<SVGPathElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const path = squiggleRef.current;
    const tile = tileRef.current;
    if (!path || !tile) return;

    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Draw in once the tile enters the viewport - works identically on
    // mobile (no hover) and desktop (first reveal), independent of hover.
    const trigger = ScrollTrigger.create({
      trigger: tile,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  // Desktop-only hover redraw. Guarded by a pointer:fine + hover media
  // query so touch devices never rely on a hover state that doesn't exist.
  const handleHoverStart = () => {
    const path = squiggleRef.current;
    if (!path || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  return (
    <motion.div
      ref={tileRef}
      variants={tileVariants}
      className="squiggle-hover-target"
      onHoverStart={handleHoverStart}
    >
      <motion.div
        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>

      <p className="mt-3 font-[var(--font-fraunces)] text-xl font-bold text-ink lg:text-[22px]">
        {service.title}
      </p>

      <svg
        width="70"
        height="8"
        viewBox="0 0 70 8"
        className="mb-1.5 mt-1 block"
        aria-hidden="true"
      >
        <path
          ref={squiggleRef}
          d="M2 5 Q 18 1, 35 5 T 68 4"
          fill="none"
          stroke={service.squiggleColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <p className="text-[13px] leading-relaxed text-ink-soft">
        {service.description}
      </p>

      <motion.div whileTap={{ scale: 0.94 }} className="inline-block">
        <Link
          href={`/?service=${service.slug}#contact`}
          className="group mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-4 py-2 text-[13px] font-bold text-ink transition-all duration-300 hover:gap-2.5 hover:border-magenta hover:bg-magenta hover:text-cream"
        >
          Get started
          <i
            className="ti ti-arrow-right text-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 lg:mb-14">
          <p className="font-[var(--font-jakarta)] text-sm font-bold uppercase tracking-wide text-ink-soft">
            Services
          </p>
          <h2 className="mt-2 font-[var(--font-fraunces)] text-4xl font-bold text-magenta lg:text-5xl">
            Pick a Project
          </h2>
          <svg
            width="110"
            height="12"
            viewBox="0 0 110 12"
            className="mt-2"
            aria-hidden="true"
          >
            <path
              d="M2 7 Q 28 2, 55 7 T 108 6"
              fill="none"
              stroke="#D93E87"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10"
        >
          {SERVICES.map((service) => (
            <ServiceTile key={service.slug} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}