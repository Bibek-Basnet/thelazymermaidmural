"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

type Testimonial = {
  quote: string;
  attribution: string;
  color: string;
  soft: string;
  dark: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Her professionalism and incredible talent has meant that this community now has two murals that they can be proud of. It enhances the environment and we are extremely grateful to her for ensuring this project came to fruition.",
    attribution: "Chorus NZ",
    color: "#D93E87",
    soft: "#FBEAF0",
    dark: "#4B1528",
  },
  {
    quote:
      "Sarah did an amazing job on the mural in our newborn's nursery. I had an ocean theme in mind and she blended it so beautifully with the existing colours in the room. It turned out even better than we imagined.",
    attribution: "Taylor and Brandon - Nursery Mural",
    color: "#FFB162",
    soft: "#FAEEDA",
    dark: "#412402",
  },
  {
    quote:
      "Sarah's ability to listen deeply, honour our spaces and translate our Manawatanga values into visual form has been exceptional.",
    attribution: "Te Manawa ō Papamōa",
    color: "#5EC1CF",
    soft: "#E1F5EE",
    dark: "#04342C",
  },
  {
    quote:
      "It's impossible to count the amount of times I've used the words OMG LOVE, OBSESSED, HOW COOL and SO COOL in reply to your messages. Sarah you are an absolute godsend and mural genius! Still can't believe this is real life.",
    attribution: "The Feel Good Art Club",
    color: "#F09580",
    soft: "#FAECE7",
    dark: "#4A1B0C",
  },
  {
    quote:
      "The installation process was seamless. Sarah engaged with staff and kaimanawa with warmth and professionalism, taking time to share her creative process.",
    attribution: "Te Manawa ō Papamōa",
    color: "#D93E87",
    soft: "#FBEAF0",
    dark: "#4B1528",
  },
  {
    quote:
      "Sarah created a mural for my business and I couldn't be happier. She listened to what I wanted and used her creative knowledge to design and paint something great. Her attention to detail shows the love she has for her work.",
    attribution: "The Barista Cafe",
    color: "#FFB162",
    soft: "#FAEEDA",
    dark: "#412402",
  },
  {
    quote:
      "I'm so happy with the beautiful logo now on my café wall! She did an amazing job. I love the details, the care, the shapes and colours she used. Highly recommend her art and her friendly professionalism.",
    attribution: "Ajna Cafe",
    color: "#5EC1CF",
    soft: "#E1F5EE",
    dark: "#04342C",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex h-[260px] w-[340px] shrink-0 flex-col justify-between rounded-2xl p-6 lg:w-[380px]"
      style={{ backgroundColor: testimonial.soft }}
    >
      <div>
        <i
          className="ti ti-quote text-2xl"
          style={{ color: testimonial.color }}
          aria-hidden="true"
        />
        <p
          className="mt-3 line-clamp-5 font-[var(--font-fraunces)] text-base leading-snug"
          style={{ color: testimonial.dark }}
        >
          {testimonial.quote}
        </p>
      </div>
      <p
        className="mt-4 text-sm font-bold"
        style={{ color: testimonial.dark, opacity: 0.75 }}
      >
        {testimonial.attribution}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    
    const singleSetWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -singleSetWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.play();

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);

    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section id="testimonials" className="overflow-hidden bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
          Testimonials
        </p>
        <h2 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-magenta lg:text-4xl">
          What people say after
        </h2>
      </div>

      <div className="relative mt-10 lg:mt-14">
        <div ref={trackRef} className="flex w-max gap-5 px-6 lg:px-16">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent lg:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent lg:w-32" />
      </div>
    </section>
  );
}