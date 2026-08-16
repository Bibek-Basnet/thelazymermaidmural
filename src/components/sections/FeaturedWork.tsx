"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  eyebrow: string;
  title: string;
  size: string;
  description: string;
  image: string;
  slug: string;
  // Defaults to "cover". Use "contain" for portrait/vertical photos that
  // lose too much when cropped to fill this landscape slide.
  fit?: "cover" | "contain";
};

// Ordered by importance per client brief. Swap `image` paths once final
// photo filenames are confirmed. Add/remove projects freely - numbering
// and scroll distance are derived from this array's length, nothing is
// hardcoded to "6".
const PROJECTS: Project[] = [
  {
    eyebrow: "Creative Bay of Plenty × Tauranga City Council",
    title: "TV3 Carpark",
    size: "160 sqm",
    description:
      "A full-height carpark facade turned into the city's biggest piece of public colour.",
    image: "/work/work1.jpeg",
    slug: "tv3-carpark",
  },
  {
    eyebrow: "Tauranga City Council",
    title: "Interactive Floor Murals",
    size: "12–18 sqm each",
    description:
      "Four playable floors - the floor is water, the floor is lava, shell hop, desert hop.",
    image: "/work/work2.jpeg",
    slug: "interactive-floor-murals",
  },
  {
    eyebrow: "Welcome Bay Community Centre",
    title: "Therapy Room Mural",
    size: "15 sqm",
    description:
      "A calming room repainted alongside local youth, start to finish.",
    image: "/work/work3.jpeg",
    slug: "welcome-bay-therapy-room",
  },
  {
    eyebrow: "Tauranga City Council",
    title: "Carpark Scavenger Hunt",
    size: "84 animals, 2 buildings",
    description:
      "Native NZ wildlife hidden through lift foyers, pillars and stairwells.",
    image: "/work/work4.jpeg",
    slug: "carpark-scavenger-hunt",
  },
  {
    eyebrow: "The Feel Good Art Club",
    title: "Mural & Brand Identity",
    size: "15 sqm",
    description:
      "Wall art built alongside a brand mark, made to work as one piece.",
    image: "/work/work5.jpeg",
    slug: "feel-good-art-club",
  },
  {
    eyebrow: "Tauranga City Council",
    title: "Primary School Container",
    size: "14 sqm",
    description:
      "A shipping-container veggie garden, painted to match what grows inside it.",
    image: "/work/work6.jpeg",
    slug: "school-shipping-container",
    fit: "contain",
  },
];

const ARTIST_STATEMENT =
  "I love creating joyful, vibrant murals that bring personality and life to a space. Each piece is thoughtfully designed and painted with care, with a focus on quality and individuality. Inspired by my love of nature and colour, I enjoy bringing bold, playful elements to homes, businesses and public spaces.";

// Total slide count includes the closing CTA card, so the progress
// indicator and scroll distance stay correct if PROJECTS changes.
const SLIDE_COUNT = PROJECTS.length + 1;

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Measure the section's actual rendered width rather than trusting
    // 100vw - vw includes the scrollbar gutter in most browsers, which
    // was quietly desyncing the scroll math over multiple cards.
    const setSlideWidth = () => {
      const width = section.getBoundingClientRect().width;
      section.style.setProperty("--slide-w", `${width}px`);
    };
    setSlideWidth();

    const resizeObserver = new ResizeObserver(() => {
      setSlideWidth();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(section);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop:
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        if (isDesktop) {
          const distance = () => track.scrollWidth - section.clientWidth;

          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 1,
              pin: true,
              // Lenis applies a transform to its wrapper for smooth
              // scroll, which breaks ScrollTrigger's default `fixed`
              // pin. Force transform-based pinning so it tracks
              // correctly inside that wrapper.
              pinType: "transform",
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Fonts/images loading after mount can shift layout height;
          // refresh once everything's settled so pin distance is exact.
          const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

          return () => {
            cancelAnimationFrame(raf);
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }

        // Compact / reduced-motion: native horizontal scroll-snap,
        // auto-advancing until the person touches it themselves.
        gsap.set(track, { x: 0 });

        let index = 0;
        let stopped = false;

        const goToNext = () => {
          if (stopped) return;
          index = (index + 1) % SLIDE_COUNT;
          track.scrollTo({
            left: index * section.clientWidth,
            behavior: "smooth",
          });
        };

        const intervalId = window.setInterval(goToNext, 4000);

        const stopAutoplay = () => {
          if (stopped) return;
          stopped = true;
          window.clearInterval(intervalId);
        };

        // Any real user interaction (not the programmatic auto-scroll)
        // stops it for good, rather than fighting the person's own swipe.
        track.addEventListener("touchstart", stopAutoplay, { passive: true });
        track.addEventListener("wheel", stopAutoplay, { passive: true });
        track.addEventListener("pointerdown", stopAutoplay);

        return () => {
          window.clearInterval(intervalId);
          track.removeEventListener("touchstart", stopAutoplay);
          track.removeEventListener("wheel", stopAutoplay);
          track.removeEventListener("pointerdown", stopAutoplay);
        };
      }
    );

    return () => {
      resizeObserver.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section
  ref={sectionRef}
  id="work"
  aria-label="Featured work"
  className="relative flex flex-col overflow-hidden bg-[var(--color-peach)] lg:h-screen"
>
      {/* Static header band - sits above the image, not on top of it */}
      <div className="relative z-10 shrink-0 p-6 lg:p-16 lg:pb-8">
        <p className="font-[var(--font-jakarta)] text-sm font-bold uppercase tracking-wide text-[var(--color-magenta)]">
          Featured work
        </p>
        <h2 className="mt-3 font-[var(--font-fraunces)] text-4xl font-bold text-[var(--color-ink)] lg:mt-4 lg:text-5xl">
          Work worth{" "}
          <span className="relative inline-block text-[var(--color-coral)]">
            walking
            <svg
              className="absolute -bottom-2 left-0 h-2 w-full lg:h-3"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 8 C 40 2, 80 10, 120 5 S 180 2, 198 6"
                fill="none"
                stroke="var(--color-mango)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          through
        </h2>
      </div>

      {/* Hand-drawn curved guide line the cards ride along */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full opacity-40"
        viewBox="0 0 1600 800"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -50 500 C 250 300, 450 700, 750 450 S 1150 250, 1450 500 S 1750 650, 1900 400"
          fill="none"
          stroke="var(--color-coral)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 14"
        />
      </svg>

      <div
        ref={trackRef}
        className={cn(
          "relative flex h-[70svh] lg:h-auto lg:flex-1",
          "overflow-x-auto lg:overflow-visible",
          "snap-x snap-mandatory lg:snap-none",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {PROJECTS.map((project, i) => (
          <a
            key={project.slug}
            ref={(el) => {
              if (el) slideRefs.current[i] = el;
            }}
            href={`/portfolio/${project.slug}`}
            style={{ width: "var(--slide-w, 100vw)" }}
            className="group relative h-full shrink-0 snap-center overflow-hidden bg-[var(--color-ink)]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "transition-transform duration-700 group-hover:scale-105",
                project.fit === "contain" ? "object-contain" : "object-cover"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/10 to-transparent" />

            <span className="absolute right-6 top-6 font-[var(--font-fraunces)] text-sm font-bold text-[var(--color-cream)]/70 lg:right-16 lg:top-10">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <p className="font-[var(--font-jakarta)] text-xs font-bold uppercase tracking-wide text-[var(--color-mango)]">
                {project.eyebrow}
              </p>
              <h3 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-[var(--color-cream)] lg:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-lg font-[var(--font-jakarta)] text-base text-[var(--color-cream)]/85">
                {project.description}
              </p>
              <p className="mt-3 font-[var(--font-jakarta)] text-xs font-semibold text-[var(--color-lagoon)]">
                {project.size}
              </p>
            </div>
          </a>
        ))}

        {/* Closing CTA slide */}
        <div
          className={cn(
            "relative flex h-full shrink-0 snap-center flex-col justify-between overflow-hidden bg-[var(--color-magenta)] p-8",
            "w-[var(--slide-w,100vw)] lg:w-[440px] lg:p-12"
          )}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--color-coral)] opacity-30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-14 left-6 h-32 w-32 rounded-full bg-[var(--color-mango)] opacity-30"
            aria-hidden="true"
          />

          <span className="relative font-[var(--font-fraunces)] text-sm font-bold text-[var(--color-cream)]/70">
            {String(SLIDE_COUNT).padStart(2, "0")}
          </span>

          <div className="relative">
            <p className="font-[var(--font-fraunces)] text-2xl leading-snug text-[var(--color-cream)]">
              {ARTIST_STATEMENT}
            </p>

            <Link
              href="/portfolio"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-[var(--radius-blob)] bg-[var(--color-cream)] px-6 py-3 font-[var(--font-jakarta)] text-sm font-bold text-[var(--color-ink)] transition-transform duration-300 hover:scale-105"
            >
              View all work
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}