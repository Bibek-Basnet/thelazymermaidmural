import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/data";
import ProjectGallery from "@/components/portfolio/ProjectGallery";

export async function generateStaticParams() {
  const projects = await getProjectSlugs();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjectSlugs(),
  ]);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    allProjects.length > 1
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  const metaLine = [
    project.client,
    project.location,
    project.size,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="min-h-screen bg-cream pb-28 pt-32 lg:pt-40">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-magenta">
          {[project.category, project.year].filter(Boolean).join(" · ")}
        </p>
        <h1 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-ink lg:text-4xl">
          {project.title}
        </h1>
        {metaLine && (
          <p className="mt-1 text-sm font-bold text-ink-soft">{metaLine}</p>
        )}

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          {project.description}
        </p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            preload
            className="object-cover"
          />
        </div>

        {project.images.length > 0 && (
          <div className="mt-10">
            <ProjectGallery images={project.images} />
          </div>
        )}

        {project.concepts.length > 0 && (
          <div className="mt-12 flex flex-col gap-14">
            {project.concepts.map((concept) => (
              <div key={concept.label}>
                <p className="font-[var(--font-fraunces)] text-xl font-bold text-magenta">
                  {concept.label}
                </p>
                {concept.description && (
                  <p className="mt-1 text-sm text-ink-soft">
                    {concept.description}
                  </p>
                )}

                {concept.images.length > 0 && (
                  <div className="mt-4">
                    <ProjectGallery images={concept.images} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {nextProject && (
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
        )}
      </div>
    </main>
  );
}
