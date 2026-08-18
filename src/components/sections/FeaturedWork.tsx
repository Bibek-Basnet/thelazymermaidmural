"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import type { FeaturedProject } from "@/sanity/lib/data";

const ARTIST_STATEMENT =
  "I love creating joyful, vibrant murals that bring personality and life to a space. Each piece is thoughtfully designed and painted with care, with a focus on quality and individuality. Inspired by my love of nature and colour, I enjoy bringing bold, playful elements to homes, businesses and public spaces.";

const AUTOPLAY_INTERVAL = 5500;

export default function FeaturedWork({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const slideCount = projects.length + 1;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const isInViewRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          const track = trackRef.current;
          if (track) {
            track.scrollTo({ left: 0, behavior: "auto" });
          }
          setActiveIndex(0);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isPausedRef.current || !isInViewRef.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % slideCount;
        const track = trackRef.current;
        const slide = track?.children[next] as HTMLElement | undefined;
        if (track && slide) {
          track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [slideCount]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(track.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft - track.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    const handlePauseStart = () => {
      isPausedRef.current = true;
    };
    const handlePauseEnd = () => {
      isPausedRef.current = false;
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("touchstart", handlePauseStart, { passive: true });
    track.addEventListener("touchend", handlePauseEnd, { passive: true });
    track.addEventListener("mouseenter", handlePauseStart);
    track.addEventListener("mouseleave", handlePauseEnd);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("touchstart", handlePauseStart);
      track.removeEventListener("touchend", handlePauseEnd);
      track.removeEventListener("mouseenter", handlePauseStart);
      track.removeEventListener("mouseleave", handlePauseEnd);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Featured work"
      className="relative flex flex-col overflow-hidden bg-peach py-16 lg:py-20"
    >
      <div className="relative z-10 shrink-0 px-6 pb-8 lg:px-16">
        <p className="font-(--font-jakarta) text-sm font-bold uppercase tracking-wide text-magenta">
          Featured work
        </p>
        <h2 className="mt-3 font-(--font-fraunces) text-4xl font-bold text-ink lg:mt-4 lg:text-5xl">
          Walls worth{" "}
          <span className="relative inline-block text-coral">
            stopping
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
          for
        </h2>
      </div>

      <div
        ref={trackRef}
        className={cn(
          "relative flex h-[70svh] lg:h-[75vh]",
          "overflow-x-auto",
          "snap-x snap-mandatory",
          "scrollbar-none scroll-smooth"
        )}
      >
        {projects.map((project, i) => (
          <a
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group relative h-full w-full shrink-0 snap-center overflow-hidden bg-ink lg:w-[85vw] xl:w-[70vw]"
          >
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              loading={i === 0 ? "eager" : undefined}
              fetchPriority={i === 0 ? "high" : undefined}
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

            <span className="absolute right-6 top-6 font-(--font-fraunces) text-sm font-bold text-cream/70 lg:right-16 lg:top-10">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <p className="font-(--font-jakarta) text-xs font-bold uppercase tracking-wide text-mango">
                {project.eyebrow}
              </p>
              <h3 className="mt-2 font-(--font-fraunces) text-3xl font-bold text-cream lg:text-4xl">
                {project.title}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-lg font-(--font-jakarta) text-base text-cream/85">
                {project.description}
              </p>
              <p className="mt-3 font-(--font-jakarta) text-xs font-semibold text-lagoon">
                {project.detailLine}
              </p>
            </div>
          </a>
        ))}

        <div className="relative flex h-full w-full shrink-0 snap-center flex-col justify-between overflow-hidden bg-magenta p-8 lg:w-[440px] lg:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-coral opacity-30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-14 left-6 h-32 w-32 rounded-full bg-mango opacity-30"
            aria-hidden="true"
          />

          <span className="relative font-(--font-fraunces) text-sm font-bold text-cream/70">
            {String(slideCount).padStart(2, "0")}
          </span>

          <div className="relative">
            <p className="font-(--font-fraunces) text-2xl leading-snug text-cream">
              {ARTIST_STATEMENT}
            </p>

            <Link
              href="/portfolio"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-(--radius-blob) bg-cream px-6 py-3 font-(--font-jakarta) text-sm font-bold text-ink transition-transform duration-300 hover:scale-105"
            >
              View all work
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 pt-6">
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              activeIndex === index ? "w-6 bg-magenta" : "w-2 bg-ink/20"
            )}
          />
        ))}
      </div>
    </section>
  );
}
