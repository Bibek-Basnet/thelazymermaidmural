"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "@/components/ui/Lightbox";
import type { Photo } from "@/sanity/lib/data";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function GalleryTile({ item, onOpen }: { item: Photo; onOpen: () => void }) {
  const splashRef = useRef<SVGCircleElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const splash = splashRef.current;
    const tile = tileRef.current;
    if (!splash || !tile) return;

    gsap.set(splash, { scale: 0, transformOrigin: "center" });

    const trigger = ScrollTrigger.create({
      trigger: tile,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(splash, { scale: 1, duration: 0.45, ease: "back.out(2)" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <motion.div
      ref={tileRef}
      variants={tileVariants}
      className="group relative aspect-square overflow-hidden rounded-xl"
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <svg
        className="pointer-events-none absolute -right-2 -top-2 h-9 w-9"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <circle ref={splashRef} cx="18" cy="18" r="15" fill="#D93E87" opacity="0.85" />
      </svg>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`View photo full screen: ${item.alt}`}
        className="absolute inset-0 cursor-zoom-in"
      />
    </motion.div>
  );
}

export default function Gallery({ items }: { items: Photo[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              Gallery
            </p>
            <h2 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-magenta lg:text-4xl">
              A closer look at the walls
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:gap-2.5 hover:border-magenta hover:bg-magenta hover:text-cream"
          >
            View my portfolio
            <i
              className="ti ti-arrow-right text-base transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
        >
          {items.map((item, index) => (
            <GalleryTile
              key={item.src}
              item={item}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
        </motion.div>
      </div>

      <Lightbox
        photos={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}