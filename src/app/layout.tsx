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

const siteUrl = "https://www.thelazymermaid.nz";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lazy Mermaid Murals | Sarah Cornish, Mural Artist in Tauranga",
    description:
      "Bold, professional mural art for businesses, councils, and public spaces in Tauranga and beyond.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NZ" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Footer />
        <BackToTopButton />
      </body>

    </html>
  );
}