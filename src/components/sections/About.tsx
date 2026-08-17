"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section
      id="about"
      aria-label="About Sarah Cornish"
      className="relative overflow-hidden bg-cream px-6 py-24 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-bold uppercase tracking-wide text-magenta">
            About
          </p>
          <h2 className="mt-3 font-(--font-fraunces) text-5xl font-bold text-ink lg:text-6xl">
            Hey, I&rsquo;m Sarah
          </h2>
        </motion.div>

        {/* items-stretch makes both columns match the taller one's height,
            so the photo fills exactly as much vertical space as the text
            block ends up needing - no fixed aspect ratio to fall out of
            sync with copy length. */}
        <div className="mt-14 grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative lg:col-span-5"
          >
            <div className="relative h-full min-h-[420px]">
              <div
                className="absolute -bottom-5 -right-5 h-full w-full rounded-(--radius-blob) bg-mango lg:-bottom-6 lg:-right-6"
                aria-hidden="true"
              />
              <div className="relative h-full overflow-hidden rounded-(--radius-blob) bg-ink">
                <Image
                  src="/work/about.jpeg"
                  alt="Sarah Cornish, muralist behind The Lazy Mermaid Murals"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>

              <div
                className="absolute -left-6 top-10 h-14 w-14 rounded-full bg-lagoon opacity-70"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="space-y-5 text-lg leading-relaxed text-ink-soft"
            >
              <p>
                I&rsquo;m the muralist and creator behind{" "}
                <span className="font-semibold text-ink">
                  The Lazy Mermaid Murals
                </span>
                .
              </p>
              <p>
                Originally from Cornwall, UK, I&rsquo;ve called New Zealand
                home since 2014, creating vibrant, colourful artwork wherever
                I can.
              </p>
              <p>
                From walls and floors to coffee trailers, shipping
                containers and buses — if it can be painted, I&rsquo;ll
                probably want to paint it!
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-14"
            >
              <h3 className="relative inline-block font-(--font-fraunces) text-2xl font-bold text-ink lg:text-3xl">
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

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  It was completely accidental. One day, my neighbour&rsquo;s
                  daughter spotted me curled up under a blanket on the sofa
                  and announced:
                </p>
              </div>

              <blockquote className="relative my-10 border-l-4 border-magenta pl-6 lg:pl-8">
                <p className="font-(--font-fraunces) text-3xl italic leading-snug text-magenta lg:text-4xl">
                  &ldquo;You look like a lazy mermaid.&rdquo;
                </p>
              </blockquote>

              <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  And just like that, the name was born. The name stuck, the
                  business grew, and{" "}
                  <span className="font-semibold text-ink">
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