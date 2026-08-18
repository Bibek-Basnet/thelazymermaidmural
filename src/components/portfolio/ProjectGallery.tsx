"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/sanity/lib/data";

const PAGE_SIZE = 24;

export default function ProjectGallery({ images }: { images: Photo[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div>
      <div className="columns-2 gap-4 lg:columns-3">
        {visibleImages.map((image) => (
          <div
            key={image.src}
            className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={800}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="group inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-6 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:gap-2.5 hover:border-magenta hover:bg-magenta hover:text-cream"
          >
            Load more
            <span className="text-xs font-normal opacity-70">
              ({visibleImages.length}/{images.length})
            </span>
            <i
              className="ti ti-chevron-down text-base transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
