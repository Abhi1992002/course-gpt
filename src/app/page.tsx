"use client";
import Background from "@/components/background/page";

import { HeroPage } from "@/components/home/hero";
import { MarqueeClient } from "@/components/home/marquee";
import { Loading } from "@/components/Loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "@/state/loading";
import { Footer } from "@/components/home/footer";
import dynamic from "next/dynamic";
import React from "react";

const FeatureSection = dynamic(
  () => import("@/components/home/feature/feature"),
  {
    ssr: false,
  }
);
const AboutSection = dynamic(() => import("@/components/home/about/about"), {
  ssr: false,
});

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

          <FeatureSection />
          <AboutSection />

          <Footer />
        </>
      )}
    </div>
  );
}
