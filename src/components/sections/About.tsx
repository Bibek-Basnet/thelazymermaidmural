"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const THINGS_SHE_PAINTS = [
  "walls",
  "floors",
  "coffee trailers",
  "electrical boxes",
  "shipping containers",
  "buses",
];

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Sarah Cornish"
      className="relative overflow-hidden bg-[var(--color-cream)] px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-[var(--font-jakarta)] text-sm font-bold uppercase tracking-wide text-[var(--color-magenta)]">
            About
          </p>
          <h2 className="mt-3 font-[var(--font-fraunces)] text-5xl font-bold text-[var(--color-ink)] lg:text-6xl">
            Hey, I&rsquo;m Sarah
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait + action shot, stacked - fills the left column
              naturally regardless of how long the story text runs,
              instead of a single sticky photo that leaves empty space
              once the text outgrows it */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Offset colour block behind the photo - the curves + squares
                  pairing carried over from the brand brief */}
              <div
                className="absolute -bottom-5 -right-5 h-full w-full rounded-[var(--radius-blob)] bg-[var(--color-mango)] lg:-bottom-6 lg:-right-6"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-blob)] bg-[var(--color-ink)]">
                <Image
                  src="/work/about.jpeg"
                  alt="Sarah Cornish, muralist behind The Lazy Mermaid Murals"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>

              {/* Small paint-dab accent */}
              <div
                className="absolute -left-6 top-10 h-14 w-14 rounded-full bg-[var(--color-lagoon)] opacity-70"
                aria-hidden="true"
              />
            </div>

            <div className="relative mx-auto mt-16 max-w-sm lg:mt-24 lg:max-w-none">
              <div
                className="absolute -left-5 -top-5 h-full w-full rounded-[var(--radius-blob)] bg-[var(--color-lagoon)] lg:-left-6 lg:-top-6"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-blob)] bg-[var(--color-ink)]">
                <Image
                  src="/work/about2.jpeg"
                  alt="Sarah mid-mural, paintbrush in hand"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>

              <div
                className="absolute -right-4 bottom-8 h-10 w-10 rounded-full bg-[var(--color-coral)] opacity-70"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Story */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="space-y-5 font-[var(--font-jakarta)] text-lg leading-relaxed text-[var(--color-ink-soft)]"
            >
              <p>
                I&rsquo;m the muralist and creator behind{" "}
                <span className="font-semibold text-[var(--color-ink)]">
                  The Lazy Mermaid Murals
                </span>
                .
              </p>
              <p>
                Originally from Cornwall in the UK, I&rsquo;ve called New
                Zealand home since 2014 - creating vibrant, colourful artwork
                wherever I can.
              </p>
              <p>
                I&rsquo;m happiest with a paintbrush in hand and a blank
                surface in front of me. I paint all sorts of spaces and
                things, from interior and exterior{" "}
                {THINGS_SHE_PAINTS.map((thing, i) => (
                  <span key={thing}>
                    {i === 0 ? "" : i === THINGS_SHE_PAINTS.length - 1 ? " and " : ", "}
                    <span className="font-semibold text-[var(--color-ink)]">
                      {thing}
                    </span>
                  </span>
                ))}
                . Basically, if it can be painted, I&rsquo;ll probably want to
                paint it!
              </p>
            </motion.div>

            {/* Origin story */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-14"
            >
              <h3 className="relative inline-block font-[var(--font-fraunces)] text-2xl font-bold text-[var(--color-ink)] lg:text-3xl">
                So, where did the name come from?
                <svg
                  className="absolute -bottom-3 left-0 h-2 w-full lg:h-3"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 C 60 2, 120 10, 180 5 S 270 2, 298 6"
                    fill="none"
                    stroke="var(--color-lagoon)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </h3>

              <div className="mt-8 space-y-5 font-[var(--font-jakarta)] text-lg leading-relaxed text-[var(--color-ink-soft)]">
                <p>Honestly&hellip; it was completely accidental.</p>
                <p>
                  I was trying to come up with the perfect name for my mural
                  business - something playful, colourful and a little bit
                  different. Then one day, my neighbour&rsquo;s daughter came
                  over to see if my daughter wanted to play.
                </p>
                <p>
                  She spotted me curled up under a blanket on the sofa
                  (which, to be fair, is exactly where you&rsquo;ll usually
                  find me when I&rsquo;m not painting - horizontal, at home
                  on the hillside with my cat).
                </p>
                <p>She took one look at me and bluntly announced:</p>
              </div>

              {/* Pull-quote - the emotional centre of the story, where the
                  business name was literally born */}
              <blockquote className="relative my-10 border-l-4 border-[var(--color-magenta)] pl-6 lg:pl-8">
                <p className="font-[var(--font-fraunces)] text-3xl italic leading-snug text-[var(--color-magenta)] lg:text-4xl">
                  &ldquo;You look like a lazy mermaid.&rdquo;
                </p>
              </blockquote>

              <div className="space-y-5 font-[var(--font-jakarta)] text-lg leading-relaxed text-[var(--color-ink-soft)]">
                <p>And just like that, the name was born.</p>
                <p>
                  The name stuck, the business grew, and{" "}
                  <span className="font-semibold text-[var(--color-ink)]">
                    The Lazy Mermaid
                  </span>{" "}
                  has been splashing colour around ever since.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}