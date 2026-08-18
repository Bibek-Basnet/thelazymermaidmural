"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const FLOATING_BLOBS = [
  { color: "bg-mango/30", size: "h-24 w-24", top: "10%", left: "6%", duration: 7, depth: 30 },
  { color: "bg-lagoon/25", size: "h-36 w-36", top: "62%", left: "10%", duration: 9, depth: 55 },
  { color: "bg-coral/25", size: "h-20 w-20", top: "18%", left: "84%", duration: 8, depth: 40 },
  { color: "bg-magenta/20", size: "h-32 w-32", top: "68%", left: "82%", duration: 6.5, depth: 65 },
  { color: "bg-lagoon/20", size: "h-16 w-16", top: "42%", left: "48%", duration: 10, depth: 20 },
];

const DRIPS = [
  { color: "var(--color-mango)", left: "15%", height: 60, delay: 0 },
  { color: "var(--color-coral)", left: "35%", height: 90, delay: 0.6 },
  { color: "var(--color-lagoon)", left: "65%", height: 70, delay: 1.1 },
  { color: "var(--color-magenta)", left: "85%", height: 100, delay: 0.3 },
];

function Digit({
  char,
  color,
  delay,
  mouseX,
  mouseY,
}: {
  char: string;
  color: string;
  delay: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const rotateY = useTransform(mouseX, [-1, 1], [-18, 18]);
  const rotateX = useTransform(mouseY, [-1, 1], [14, -14]);
  const springY = useSpring(rotateX, { stiffness: 120, damping: 14 });
  const springXRot = useSpring(rotateY, { stiffness: 120, damping: 14 });

  return (
    <motion.span
      initial={{ opacity: 0, y: 60, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        color,
        rotateX: springY,
        rotateY: springXRot,
        transformStyle: "preserve-3d",
        textShadow: "0 18px 30px rgba(43,36,32,0.18)",
      }}
      className="inline-block"
    >
      {char}
    </motion.span>
  );
}

export default function NotFound() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-cream px-6 py-24 text-center"
    >
      {FLOATING_BLOBS.map((blob, index) => {
        const x = useTransform(mouseX, [-1, 1], [blob.depth, -blob.depth]);
        const y = useTransform(mouseY, [-1, 1], [blob.depth, -blob.depth]);
        const springX = useSpring(x, { stiffness: 60, damping: 14 });
        const springYPos = useSpring(y, { stiffness: 60, damping: 14 });

        return (
          <motion.div
            key={index}
            aria-hidden="true"
            style={{ top: blob.top, left: blob.left, x: springX, y: springYPos }}
            className={`pointer-events-none absolute rounded-full blur-2xl ${blob.color} ${blob.size}`}
          >
            <motion.div
              className="h-full w-full rounded-full"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 25, 0] }}
              transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        );
      })}

      {DRIPS.map((drip, index) => (
        <motion.div
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 w-2 rounded-b-full"
          style={{ left: drip.left, backgroundColor: drip.color }}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: [0, drip.height, drip.height * 0.85], opacity: [0, 0.5, 0.5] }}
          transition={{
            duration: 2.2,
            delay: drip.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 3,
          }}
        />
      ))}

      <div style={{ transformStyle: "preserve-3d" }} className="relative">
        <h1 className="relative font-display text-[6rem] font-bold leading-none sm:text-[8rem] lg:text-[10rem]">
          <Digit char="4" color="var(--color-mango)" delay={0} mouseX={mouseX} mouseY={mouseY} />
          <Digit char="0" color="var(--color-coral)" delay={0.1} mouseX={mouseX} mouseY={mouseY} />
          <Digit char="4" color="var(--color-lagoon)" delay={0.2} mouseX={mouseX} mouseY={mouseY} />
        </h1>

        <motion.svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="relative -mt-2 mb-6 h-4 w-48 sm:w-64"
        >
          <motion.path
            d="M3,10 C30,3 55,17 85,8 C115,0 145,15 175,7 C185,4 192,9 197,6"
            fill="none"
            stroke="var(--color-magenta)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="max-w-md font-display text-2xl font-semibold text-ink sm:text-3xl"
      >
        Looks like this wall hasn&apos;t been painted yet
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        className="mt-4 max-w-sm font-body text-sm text-ink-soft sm:text-base"
      >
        The page you&apos;re looking for has either moved, been repainted, or
        never existed at all. Let&apos;s get you back to the good stuff.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
      >
        <Link
          href="/"
          className="rounded-blob bg-magenta px-7 py-3 font-body text-sm font-bold text-cream transition-transform duration-200 hover:scale-105"
        >
          Back to home
        </Link>
        <Link
          href="/#portfolio"
          className="rounded-blob border-2 border-ink px-7 py-3 font-body text-sm font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
        >
          See the work
        </Link>
      </motion.div>
    </main>
  );
}