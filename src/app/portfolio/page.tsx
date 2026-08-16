import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Portfolio | The Lazy Mermaid Murals",
  description: "A full look at Sarah Cornish's mural work - public art, commercial murals, school and community projects across Tauranga.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-cream pb-28">
      {/* Hero */}
      <div className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden lg:h-[60vh]">
        <Image
          src="/hero-bg.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 lg:px-16 lg:pb-16">
          <p className="text-sm font-bold uppercase tracking-wide text-mango">
            Portfolio
          </p>
          <h1 className="mt-2 font-[var(--font-fraunces)] text-4xl font-bold text-cream lg:text-6xl">
            Every wall tells{" "}
            <span className="text-coral">a story</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream/80">
            From full public art commissions to a single hand-painted
            electrical box - every piece made for its space.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/5">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-2.5 py-1 text-xs font-bold text-ink">
                  {project.year}
                </span>
              </div>

              <p className="mt-3 font-[var(--font-fraunces)] text-lg font-bold text-ink">
                {project.title}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                {project.client} · {project.category}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}