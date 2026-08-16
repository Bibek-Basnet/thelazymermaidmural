"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Work", href: "/#work", color: "mango" },
  { label: "About", href: "/#about", color: "lagoon" },
  { label: "Services", href: "/#services", color: "magenta" },
  { label: "Process", href: "/#process", color: "coral" },
  { label: "Gallery", href: "/#gallery", color: "mango" },
  { label: "Contact", href: "/#contact", color: "lagoon" },
];

const UNDERLINE_COLOR: Record<string, string> = {
  mango: "bg-mango",
  lagoon: "bg-lagoon",
  coral: "bg-coral",
  magenta: "bg-magenta",
};

// Shared so desktop nav, mobile drawer, and the logo all route through
// Lenis the same way instead of relying on native hash jumps.
function scrollToSection(href: string, onDone?: () => void) {
  if (!href.includes("#")) return false;

  const id = href.split("#")[1];
  const target = document.getElementById(id);
  if (!target) return false;

  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(target, { offset: -80, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onDone?.();
  return true;
}

// Logo goes to the literal top of the page, not to a section element —
// scrolling to an element can still land partway down depending on that
// element's internal layout, so this scrolls the scroll position to 0.
function scrollToTop(onDone?: () => void) {
  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  onDone?.();
}

function NavLink({
  label,
  href,
  color,
  isScrolled,
}: {
  label: string;
  href: string;
  color: string;
  isScrolled: boolean;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const handled = scrollToSection(href);
    if (handled) e.preventDefault();
  };

  return (
    <Link href={href} onClick={handleClick} className="group relative inline-block px-1 py-1.5">
      <span
        className={cn(
          "font-body text-base font-bold transition-colors duration-300",
          isScrolled ? "text-ink" : "text-cream"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out group-hover:scale-x-100",
          UNDERLINE_COLOR[color]
        )}
      />
    </Link>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToTop();
  };

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close the drawer first so the scroll animation isn't fighting the
    // drawer's own exit transition, then hand off to Lenis.
    setIsMenuOpen(false);
    const handled = scrollToSection(href);
    if (handled) e.preventDefault();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm py-3"
          : "bg-gradient-to-b from-ink/45 via-ink/15 to-transparent py-6"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" onClick={handleLogoClick}>
          <Image
            src="/logo.png"
            alt="The Lazy Mermaid Murals"
            width={160}
            height={160}
            priority
            className="h-14 w-auto lg:h-16"
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                label={link.label}
                href={link.href}
                color={link.color}
                isScrolled={isScrolled}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            "transition-colors duration-300 lg:hidden",
            isScrolled ? "text-ink" : "text-cream"
          )}
          aria-label="Open menu"
        >
          <HiOutlineMenuAlt4 size={26} />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-[78%] max-w-xs flex-col rounded-l-3xl bg-cream shadow-lg lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-6">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleLogoClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleLogoClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <Image
                    src="/logo.png"
                    alt="The Lazy Mermaid Murals"
                    width={110}
                    height={110}
                    className="h-11 w-auto"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-ink"
                  aria-label="Close menu"
                >
                  <HiX size={24} />
                </button>
              </div>

              <ul className="flex flex-1 flex-col gap-1 px-6 pt-4">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="border-b border-peach/70 py-4"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleMobileLinkClick(e, link.href)}
                      className="font-display text-2xl font-semibold text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}