import { HeroPage } from "@/components/home/hero";
import { MarqueeClient } from "@/components/home/marquee";
import { Footer } from "@/components/home/footer";
import dynamic from "next/dynamic";
import React from "react";

const FeatureSection = dynamic(
  () => import("@/components/home/feature/feature"),
  {
    ssr: true,
  }
);
const AboutSection = dynamic(() => import("@/components/home/about/about"), {
  ssr: true,
});

export default function Home() {
  return (
    <div>
      <>
        <HeroPage />
        <MarqueeClient />

        <FeatureSection />
        <AboutSection />

        <Footer />
      </>
    </div>
  );
}
