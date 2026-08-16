import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/lib/data/projects";
import ProjectGallery from "@/components/portfolio/ProjectGallery";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} | The Lazy Mermaid Murals`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-cream pb-28 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-magenta">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-ink lg:text-4xl">
          {project.title}
        </h1>
        <p className="mt-1 text-sm font-bold text-ink-soft">
          {project.client}
          {project.location ? ` · ${project.location}` : ""}
          {project.size ? ` · ${project.size}` : ""}
        </p>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        {project.images && project.images.length > 0 && (
          <div className="mt-10">
            <ProjectGallery images={project.images} altPrefix={project.title} />
          </div>
        )}

        {project.concepts && (
          <div className="mt-12 flex flex-col gap-14">
            {project.concepts.map((concept) => (
              <div key={concept.label}>
                <p className="font-[var(--font-fraunces)] text-xl font-bold text-magenta">
                  {concept.label}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{concept.description}</p>

                <div className="mt-4">
                  <ProjectGallery
                    images={concept.images}
                    altPrefix={concept.label}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-8">
          <p className="text-sm text-ink-soft">Next project</p>
          <Link
            href={`/portfolio/${nextProject.slug}`}
            className="group flex items-center gap-2 font-[var(--font-fraunces)] text-lg font-bold text-ink transition-colors duration-300 hover:text-magenta"
          >
            {nextProject.title}
            <i
              className="ti ti-arrow-right text-base transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}