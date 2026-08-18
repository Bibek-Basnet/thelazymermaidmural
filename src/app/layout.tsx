import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/ui/BackToTopButton";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://www.thelazymermaidmurals.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Lazy Mermaid Murals | Sarah Cornish, Mural Artist in Tauranga",
    template: "%s | The Lazy Mermaid Murals",
  },
  description:
    "Bold, professional mural art for businesses, councils, and public spaces in Tauranga and beyond. Large-scale murals, interactive floor art, and custom branded pieces by artist Sarah Cornish.",
  keywords: [
    "mural artist Tauranga",
    "public art Tauranga",
    "commercial mural artist New Zealand",
    "The Lazy Mermaid Murals",
    "Sarah Cornish artist",
  ],
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: siteUrl,
    siteName: "The Lazy Mermaid Murals",
    title: "The Lazy Mermaid Murals | Sarah Cornish, Mural Artist in Tauranga",
    description:
      "Bold, professional mural art for businesses, councils, and public spaces in Tauranga and beyond.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "The Lazy Mermaid Murals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lazy Mermaid Murals | Sarah Cornish, Mural Artist in Tauranga",
    description:
      "Bold, professional mural art for businesses, councils, and public spaces in Tauranga and beyond.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#business`,
  name: "The Lazy Mermaid Murals",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  email: "Sarah.thelazymermaid@gmail.com",
  telephone: "+64290209386",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tauranga",
    addressRegion: "Bay of Plenty",
    addressCountry: "NZ",
  },
  areaServed: {
    "@type": "City",
    name: "Tauranga",
  },
  founder: {
    "@type": "Person",
    name: "Sarah Cornish",
  },
  sameAs: ["https://www.instagram.com/the_lazymermaid_murals/"],
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Footer />
        <BackToTopButton />
      </body>
    </html>
  );
}