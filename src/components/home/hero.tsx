"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GradientBorderButton } from "./gradientButton";
import { Button } from "../ui/button";

type HeroPageProps = {};

export function HeroPage({}: HeroPageProps) {
  const router = useRouter();
  return (
    <div className="w-screen h-screen  z-[1] flex items-center justify-center flex-col relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-center ">
        {/* <h1 className="animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl w-[90vw] sm:w-[60vw] text-center font-extrabold pb-[20px]">
          Create Courses Using AI
        </h1> */}
        <p className="text-foreground w-[90vw] sm:w-[60vw] text-center sm:text-lg md:text-xl">
          Unlock the Future of Learning with AI-Powered Courses. Experience
          Personalized Learning like Never Before. Join us on a journey of
          knowledge and innovation!
        </p>
        <div className="flex flex-col gap-[30px] w-[90vw] md:w-[70vw] lg:w-[50vw] md:flex-row mt-[70px]">
          <Button
            onClick={() => router.push("/gallery")}
            className="p-[14px] w-[100%] z-[10] cursor-pointer"
          >
            Get Started
          </Button>
          <GradientBorderButton onClick={() => router.push("/create")}>
            Create Course using AI
          </GradientBorderButton>
        </div>
      </div>
      <div className="w-[1400px] lg:w-[100vw] h-[45vh] overflow-hidden absolute bottom-0 flex items-start justify-start">
        <img
          src="/wave2.svg"
          className="w-[100%] object-cover absolute opacity-[0.5] invert-inverts"
          alt=""
        />
      </div>
    </div>
  );
}
