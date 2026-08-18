"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";
import type { Photo } from "@/sanity/lib/data";

const PAGE_SIZE = 24;

export default function ProjectGallery({ images }: { images: Photo[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  return (
    <div>
      <div className="columns-2 gap-4 lg:columns-3">
        {visibleImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setLightboxIndex(index)}
            aria-label={`View photo full screen: ${image.alt}`}
            className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={800}
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
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

      {/* All photos, not just the visible page — arrows can browse the full set. */}
      <Lightbox
        photos={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}
