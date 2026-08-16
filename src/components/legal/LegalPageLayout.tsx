import Link from "next/link";
import type { ReactNode } from "react";

const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund & Cancellation", href: "/refund-and-cancellation" },
];

export default function LegalPageLayout({
  title,
  lastUpdated,
  currentHref,
  children,
}: {
  title: string;
  lastUpdated: string;
  currentHref: string;
  children: ReactNode;
}) {
  const otherPages = LEGAL_PAGES.filter((page) => page.href !== currentHref);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <Link
          href="/"
          className="text-sm font-bold text-ink-soft transition-colors duration-300 hover:text-magenta"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 font-[var(--font-fraunces)] text-3xl font-bold text-ink lg:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: {lastUpdated}</p>

        <div className="legal-content mt-10">{children}</div>

        <div className="mt-16 rounded-2xl bg-cream p-6 lg:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
            Related policies
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {otherPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="text-sm font-bold text-magenta transition-colors duration-300 hover:text-ink"
                >
                  {page.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}