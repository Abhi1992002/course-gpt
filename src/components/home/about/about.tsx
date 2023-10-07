"use client";
import React from "react";
import { motion } from "framer-motion";
import { LowerSvgOrange } from "../svg/orange/lower";
import { container, item } from "./about_animation";
import { AboutContent } from "./AboutContent";

type AboutProps = {};

export default function About({}: AboutProps) {
  return (
    <div className="w-screen h-[screen] flex flex-col items-center relative">
      <div className="w-[90%] sm:w-[80%] h-[70vh] bg-background rounded-lg border-[0.5px] dark:box-shadows shadow-2xl relative">
        <AboutContent />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="relative flex items-center justify-center"
      >
        <motion.div
          variants={item}
          className="relative flex items-center justify-center"
        >
          <LowerSvgOrange />
        </motion.div>
      </motion.div>
    </div>
  );
}
