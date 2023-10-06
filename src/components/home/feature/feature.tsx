"use client";

import React from "react";
import { motion } from "framer-motion";
import { UpperSvgGreen } from "../svg/green/upper";
import { LowerSvgPink } from "../svg/pink/lower";
import { MidGreenSvg } from "../svg/green/mid";
import { container, item } from "./feature_animation";
import { ScrollShadow } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type FeatureProps = {};

export default function Feature({}: FeatureProps) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center  h-[130vh]">
      <div className="w-[100vw] sm:1500px h-[100%] flex items-center sm:justify-end justify-center relative">
        {/* box-right */}
        <div className="h-[100%] sm:w-[80%] sm:max-w-[700px] w-[90%] sm:mr-[70px]">
          {/* upper */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="w-[100%] h-[20vh] flex items-center justify-center relative z-[3]"
          >
            <motion.div
              variants={item}
              className="w-[100%] h-[20vh] flex items-center justify-center relative z-[2]"
            >
              <UpperSvgGreen />
            </motion.div>
          </motion.div>

          {/* content */}
          <div className="w-[100%] h-[60vh] flex items-center justify-center bg-secondary rounded-lg dark:border-[#30363d] border-[0.5px] dark:box-shadows shadow-2xl relative z-[1]">
            <MidGreenSvg />
            <ScrollShadow
              className="w-[100%] h-[100%] flex items-center gap-[40px] md:gap-[70px] flex-col"
              hideScrollBar
            >
              <h1 className="w-[95%] text-center mt-[40px] text-xl sm:text-2xl font-bold">
                About
              </h1>
              <p className="text-foreground w-[90%] md:w-[70%] text-center">
                Welcome to courseGPT, a passion project that leverages the power
                of AI, YouTube API, and Unsplash API to craft captivating
                courses. We're all about making learning an enjoyable journey,
                providing dynamic content that's designed for fun and curiosity
                rather than profit. Join us in redefining education with
                innovation and accessibility, where every click brings you
                closer to knowledge and adventure.
              </p>
              <Button
                onClick={() => router.push("/create")}
                className="mb-[100px] cursor-pointer"
              >
                Create course
              </Button>
            </ScrollShadow>
          </div>

          {/* lower */}
          <motion.div
            variants={container}
            whileInView="show"
            initial="hidden"
            className="w-[100%] h-[50vh] flex items-center justify-center relative z-[1]"
          >
            <motion.div
              variants={item}
              className="w-[100%] h-[50vh] flex items-center justify-center relative z-[-100]"
            >
              <LowerSvgPink />
            </motion.div>
          </motion.div>

          <div />
        </div>
      </div>
    </div>
  );
}
