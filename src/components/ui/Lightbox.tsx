"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "@/sanity/lib/data";

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  /** Index of the open photo, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const isOpen = index !== null && index >= 0 && index < photos.length;
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (step: number) => {
      if (index === null || photos.length < 2) return;
      onIndexChange((index + step + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    window.lenisInstance?.stop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      window.lenisInstance?.start();
    };
  }, [isOpen, goTo, onClose]);

  const photo = isOpen ? photos[index] : null;

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          data-lenis-prevent
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95"
          onClick={onClose}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) > 50) goTo(delta > 0 ? -1 : 1);
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close full screen view"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors duration-200 hover:bg-cream/20 lg:right-6 lg:top-6"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors duration-200 hover:bg-cream/20 lg:left-6"
              >
                <i className="ti ti-chevron-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goTo(1);
                }}
                aria-label="Next photo"
                className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition-colors duration-200 hover:bg-cream/20 lg:right-6"
              >
                <i className="ti ti-chevron-right" aria-hidden="true" />
              </button>
            </>
          )}

          <motion.div
            key={photo.full}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative h-[calc(100svh-7rem)] w-[calc(100vw-1rem)] lg:w-[calc(100vw-10rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photo.full}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 px-6 text-center">
            <p className="max-w-xl truncate text-sm text-cream/85">{photo.alt}</p>
            {photos.length > 1 && (
              <p className="text-xs font-bold text-cream/60">
                {index + 1} / {photos.length}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
