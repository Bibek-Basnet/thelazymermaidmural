"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap/registerGsap";

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Exposed under a name that doesn't collide with the lenis package's
    // own internal `window.lenis` devtools hook.
    window.lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.lenisInstance = undefined;
    };
  }, []);

  return <>{children}</>;
}