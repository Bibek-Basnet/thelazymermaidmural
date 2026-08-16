"use client";

import Link from "next/link";
import Image from "next/image";
import { siInstagram, siWhatsapp } from "simple-icons";
import { HiOutlineMail } from "react-icons/hi";

const QUICK_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
];

const INSTAGRAM_URL = "https://instagram.com/thelazymermaidmurals";
const WHATSAPP_URL = "https://wa.me/64000000000"; // replace with real number
const EMAIL_ADDRESS = "hello@thelazymermaid.nz";

function scrollToSection(href: string) {
  if (!href.includes("#")) return false;
  const id = href.split("#")[1];
  const target = document.getElementById(id);
  if (!target) return false;

  if (window.lenisInstance) {
    window.lenisInstance.scrollTo(target, { offset: -80, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function SimpleIconSvg({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleQuickLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const handled = scrollToSection(href);
    if (handled) e.preventDefault();
  };

  return (
    <footer className="relative overflow-hidden bg-ink px-6 pb-8 pt-16 lg:px-16 lg:pt-24">
      {/* Soft brand-color glow, mirrors the blob motif used in Hero/About */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-magenta opacity-10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-lagoon opacity-10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-8">
          {/* Brand column */}
          <div>
            <Image
              src="/logo.png"
              alt="The Lazy Mermaid Murals"
              width={140}
              height={140}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              Bold, playful murals for homes, businesses and public spaces -
              based in Tauranga, New Zealand.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-magenta"
              >
                <SimpleIconSvg path={siInstagram.path} className="h-5 w-5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-lagoon"
              >
                <SimpleIconSvg path={siWhatsapp.path} className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors duration-300 hover:bg-mango"
              >
                <HiOutlineMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cream/50">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleQuickLinkClick(e, link.href)}
                    className="text-sm font-medium text-cream/80 transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + legal */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-cream/50">
              Get in touch
            </p>
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="mt-4 block text-sm font-medium text-cream/80 transition-colors duration-300 hover:text-cream"
            >
              {EMAIL_ADDRESS}
            </a>

            <p className="mt-8 text-sm font-bold uppercase tracking-wide text-cream/50">
              Legal
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-cream/80 transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 lg:flex-row lg:items-center lg:justify-between">
          <p>© {year} The Lazy Mermaid Murals. All rights reserved.</p>
          <p>Made with brush and a little chaos in Tauranga, NZ.</p>
        </div>
      </div>
    </footer>
  );
}