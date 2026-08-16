"use client";

import { useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  number: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
  color: string;
  soft: string;
  dark: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Say hello",
    description:
      "Tell Sarah about your wall, your space and the feeling you want it to give people. A quick chat is enough to get moving.",
    bullets: ["Friendly phone or email chat", "Budget guidance", "Rough timeframe"],
    icon: "ti-message-circle",
    color: "#D93E87",
    soft: "#FBEAF0",
    dark: "#4B1528",
  },
  {
    number: "02",
    title: "Walk the space",
    description:
      "Sarah visits, measures and gets to know who actually uses the place, because the best artwork grows out of its surroundings.",
    bullets: ["Site visit and measurements", "Surface check", "Ideas on the spot"],
    icon: "ti-walk",
    color: "#FFB162",
    soft: "#FAEEDA",
    dark: "#412402",
  },
  {
    number: "03",
    title: "Concept and colour",
    description:
      "You receive a visual concept of the artwork mocked up in your actual space, then it gets refined together until it feels right.",
    bullets: ["Concept mock-up in your space", "Colour palette", "Revisions together"],
    icon: "ti-palette",
    color: "#5EC1CF",
    soft: "#E1F5EE",
    dark: "#04342C",
  },
  {
    number: "04",
    title: "Paint week",
    description:
      "Scaffolds up, colours out. Sarah keeps the site tidy and the disruption small. Watching the wall change is half the fun.",
    bullets: ["Quality exterior paints", "Minimal disruption", "Progress updates"],
    icon: "ti-brush",
    color: "#F09580",
    soft: "#FAECE7",
    dark: "#4A1B0C",
  },
  {
    number: "05",
    title: "The reveal",
    description:
      "A finished artwork, sealed and protected, and a space people suddenly see completely differently.",
    bullets: ["Protective sealant", "Care guide", "The big unveil"],
    icon: "ti-sparkles",
    color: "#D93E87",
    soft: "#FBEAF0",
    dark: "#4B1528",
  },
];

const bulletContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const bulletItem = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

function StepRow({ step, index }: { step: Step; index: number }) {
  const splashRef = useRef<SVGPathElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const splash = splashRef.current;
    const row = rowRef.current;
    if (!splash || !row) return;

    gsap.set(splash, { scale: 0, transformOrigin: "center" });

    const trigger = ScrollTrigger.create({
      trigger: row,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(splash, {
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`relative flex items-start gap-4 lg:items-center lg:gap-14 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="flex shrink-0 justify-center lg:w-[220px]">
        <div className="relative flex h-16 w-16 items-center justify-center lg:h-40 lg:w-40">
          <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path
              ref={splashRef}
              d="M80 12c22 0 30 18 44 24 16 7 24 22 20 38-4 17-20 22-24 38-4 17-18 30-40 30-21 0-34-14-42-28-9-16-24-20-26-38-2-17 10-28 22-40C46 24 60 12 80 12Z"
              fill={step.color}
            />
          </svg>
          <div className="relative flex flex-col items-center">
            <span
              className="font-[var(--font-fraunces)] text-sm font-bold lg:text-2xl"
              style={{ color: step.dark }}
            >
              {step.number}
            </span>
            <i
              className={`ti ${step.icon} mt-0.5 text-base lg:mt-1 lg:text-2xl`}
              style={{ color: step.dark }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 rounded-2xl bg-white p-5 lg:p-8"
      >
        <p className="font-[var(--font-fraunces)] text-lg font-bold text-ink lg:text-2xl">
          {step.title}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft lg:text-[15px]">
          {step.description}
        </p>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={bulletContainer}
          className="mt-3 flex flex-wrap gap-2 lg:mt-4"
        >
          {step.bullets.map((bullet) => (
            <motion.li
              key={bullet}
              variants={bulletItem}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold lg:px-3 lg:py-1.5 lg:text-xs"
              style={{ backgroundColor: step.soft, color: step.dark }}
            >
              <i className="ti ti-check text-[12px] lg:text-[13px]" aria-hidden="true" />
              {bullet}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 1024px)", isMobile: "(max-width: 1023px)" },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const line = isDesktop ? lineRef.current : mobileLineRef.current;
        if (!line) return;

        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(line, { strokeDashoffset: length * (1 - self.progress) });
          },
        });

        return () => trigger.kill();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative bg-peach px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 lg:mb-20">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            The process
          </p>
          <h2 className="mt-2 font-[var(--font-fraunces)] text-2xl font-bold text-magenta lg:text-4xl">
            Your mural, from hello to hung
          </h2>
        </div>

        <div className="relative">
          {/* Desktop: centered line */}
          <svg
            width="4"
            height="100%"
            viewBox="0 0 4 2000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 lg:block"
            aria-hidden="true"
          >
            <path
              ref={lineRef}
              d="M2 0 L2 2000"
              fill="none"
              stroke="#F09580"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 14"
            />
          </svg>

          {/* Mobile: left-aligned line, threads through the splash column */}
          <svg
            width="4"
            height="100%"
            viewBox="0 0 4 2000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-8 top-0 h-full lg:hidden"
            aria-hidden="true"
          >
            <path
              ref={mobileLineRef}
              d="M2 0 L2 2000"
              fill="none"
              stroke="#F09580"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 14"
            />
          </svg>

          <div className="relative flex flex-col gap-10 lg:gap-24">
            {STEPS.map((step, index) => (
              <StepRow key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}