import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import ClientLogos from "@/components/sections/ClientLogos";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import { getFeaturedProjects, getGalleryImages } from "@/sanity/lib/data";

export default async function Home() {
  const [featuredProjects, galleryItems] = await Promise.all([
    getFeaturedProjects(),
    getGalleryImages(),
  ]);

  return (
    <main>
      <Hero />
      <FeaturedWork projects={featuredProjects} />
      <About />
      <ClientLogos />
      <Services />
      <Testimonials />
      <Process />
      {galleryItems.length > 0 && <Gallery items={galleryItems} />}
      <FAQ />
      <Contact />
    </main>
  );
}
