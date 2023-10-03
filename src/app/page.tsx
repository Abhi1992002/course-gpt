"use client"
import Background from "@/components/background/page";
import Navbar from "@/components/home/Navbar";
import { About } from "@/components/home/about/about";
import { Feature } from "@/components/home/feature/feature";

import { HeroPage } from "@/components/home/hero";
import { MarqueeClient } from "@/components/home/marquee";

import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import { Steps } from "@/components/home/stepper/steps";
import { Loading } from "@/components/Loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/state/laoding";

export default function Home() {
  const [dimension, setDimension] = useState({width:0, height:0});
  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time:any) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  const isLoading = useRecoilValue(loadingState)

  return (
    <div>
      {
        isLoading ? 
         <Loading />
         :
        <>
      <Background />
      <HeroPage />
      <MarqueeClient />
      <Feature />
      <About />
      <Steps />
        </>
      }
   
    </div>
  );
}
