"use client";

import Background from "@/components/background/page";
import { About } from "@/components/home/about/about";
import { Feature } from "@/components/home/feature/feature";
import { HeroPage } from "@/components/home/hero";
import { MarqueeClient } from "@/components/home/marquee";
import { Loading } from "@/components/Loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/state/loading";
import { Footer } from "@/components/home/footer";

export default function Home() {
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
