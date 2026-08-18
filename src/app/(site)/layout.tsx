import Navbar from "@/components/layout/Navbar";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Footer from "@/components/layout/Footer";
import BackToTopButton from "@/components/ui/BackToTopButton";

const siteUrl = "https://www.thelazymermaidmurals.com";

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

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <Footer />
      <BackToTopButton />
    </>
  );
}
