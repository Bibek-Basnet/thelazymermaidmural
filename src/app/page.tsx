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

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <About />
      <ClientLogos />
      <Services />
      <Testimonials />
      <Process />
      <Gallery />
      <FAQ />
      <Contact />
      
    </main>
  );
}