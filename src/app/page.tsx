"use client";

import Background from "@/components/background/page";
import { About } from "@/components/home/about/about";
import { Feature } from "@/components/home/feature/feature";
import { HeroPage } from "@/components/home/hero";
import { MarqueeClient } from "@/components/home/marquee";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/state/loading";
import { Footer } from "@/components/home/footer";

export default function Home() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const isLoading = useRecoilValue(loadingState);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Background />
          <HeroPage />
          <MarqueeClient />
          <Feature />
          <About />
          <Footer />
        </>
      )}
    </div>
  );
}
