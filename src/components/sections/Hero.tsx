"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap/registerGsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to(bgRef.current, { scale: 1.05, duration: 1.6, ease: "power1.out" }, 0)
        .to(scrimRef.current, { opacity: 1, duration: 0.9 }, 1)
        .fromTo(
          textRef.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          1.5
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden sm:h-screen"
    >
      <div ref={bgRef} className="absolute inset-0 h-full w-full">
        <Image
          src="/hero-bg1.jpeg"
          alt="A large scale mural painted by Sarah Cornish, The Lazy Mermaid Murals"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0 bg-ink/55 opacity-0"
      />

      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center opacity-0"
      >
        <h1 className="max-w-2xl font-display text-[1.75rem] font-semibold leading-snug text-cream sm:text-4xl lg:text-5xl">
          Bringing{" "}
          <span className="text-mango">colour</span>,{" "}
          <span className="text-coral">creativity</span> and{" "}
          <span className="text-lagoon">community</span> to{" "}
          <span className="relative inline-block">
            life
            <svg
              viewBox="0 0 90 14"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full sm:-bottom-2 sm:h-4"
            >
              <path
                d="M2,8 C15,3 30,11 45,6 C60,2 75,10 88,5"
                fill="none"
                stroke="var(--color-magenta)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4">
          <Link
            href="/#portfolio"
            className="rounded-blob bg-magenta px-6 py-3 font-body text-sm font-bold text-cream transition-transform duration-200 hover:scale-105 sm:px-7"
          >
            See the work
          </Link>
          <Link
            href="/#contact"
            className="rounded-blob border-2 border-cream px-6 py-3 font-body text-sm font-bold text-cream transition-colors duration-200 hover:bg-cream hover:text-ink sm:px-7"
          >
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}