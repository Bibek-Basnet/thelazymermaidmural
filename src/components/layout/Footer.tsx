// src/components/sections/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaPinterest,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { cn } from "@/lib/utils/cn";

const FOOTER_LINKS = {
  services: [
    { label: "Custom Murals", href: "/services#custom" },
    { label: "Commercial Murals", href: "/services#commercial" },
    { label: "Residential Murals", href: "/services#residential" },
    { label: "Restoration", href: "/services#restoration" },
  ],
  company: [
    { label: "About", href: "/#about" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
  ],
};

const SOCIAL_ICONS = [
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { icon: FaPinterest, href: "https://pinterest.com", label: "Pinterest" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-cream">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink-soft/5 to-transparent pointer-events-none" />
      
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mango/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="The Lazy Mermaid Murals"
                width={160}
                height={160}
                className="h-14 w-auto brightness-0 invert lg:h-16"
              />
            </Link>
            
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream/70">
              Creating breathtaking murals that transform spaces into works of art. 
              Let us bring your vision to life with our unique artistic touch.
            </p>

            <div className="mt-6 flex gap-4">
              {SOCIAL_ICONS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-cream/10 p-2.5 text-cream transition-colors duration-300 hover:bg-mango hover:text-ink"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 lg:col-span-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-mango">
                  Services
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER_LINKS.services.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-mango">
                  Company
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-mango">
                  Support
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {FOOTER_LINKS.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="mt-12 border-t border-cream/10 pt-8">
          <div className="flex flex-col flex-wrap items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-mango/70" size={16} />
                <a
                  href="mailto:hello@lazymermaidmurals.com"
                  className="font-body text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
                >
                  hello@lazymermaidmurals.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhone className="text-mango/70" size={16} />
                <a
                  href="tel:+1234567890"
                  className="font-body text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaMapMarkerAlt className="text-mango/70" size={16} />
                <span className="font-body text-sm text-cream/70">
                  Austin, TX
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <form className="flex w-full max-w-xs gap-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="flex-1 rounded-full bg-cream/10 px-4 py-2 text-sm text-cream placeholder-cream/40 outline-none transition-all duration-300 focus:bg-cream/20 focus:ring-2 focus:ring-mango/50"
                required
              />
              <button
                type="submit"
                className="rounded-full bg-mango px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:bg-mango/80 hover:shadow-lg hover:shadow-mango/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-cream/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-body text-xs text-cream/50">
              &copy; {currentYear} The Lazy Mermaid Murals. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="font-body text-xs text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-body text-xs text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="font-body text-xs text-cream/50 transition-colors duration-300 hover:text-cream"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}