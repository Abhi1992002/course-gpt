"use client";
import React from "react";
import { Globe } from "../globe/globe";
import { motion } from "framer-motion";
import { UpperSvgGreen } from "../svg/green/upper";
import { LowerSvgPink } from "../svg/pink/lower";
import { MidGreenSvg } from "../svg/green/mid";
import {container,item} from './feature_animation'

type FeatureProps = {};

export const Feature = ({}: FeatureProps) => {


  return (
    <div className="flex items-center justify-center  h-[130vh]">
      <div className="w-[100vw] sm:1500px h-[100%] flex items-center justify-end relative">
        {/* globe-left */}
        <div className="absolute left-[0]  lg:top-[0%] bottom-0 md:bottom-[-40%]">
          {/* <Globe /> */}
        </div>
       
        {/* box-right */}
        <div className="h-[100%] w-[80%] max-w-[700px] mr-[70px]">
          {/* upper */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="w-[100%] h-[20vh] flex items-center justify-center relative z-[-100]"
          >
            <motion.div
              variants={item}
              className="w-[100%] h-[20vh] flex items-center justify-center relative z-[2]"
            >
              <UpperSvgGreen />
            </motion.div>
          </motion.div>

          {/* lower */}
          <div className="w-[100%] h-[60vh] bg-secondary rounded-lg dark:border-[#30363d] border-[0.5px] dark:box-shadows shadow-2xl relative z-[1]">
            <MidGreenSvg />
          </div>

          {/* lower */}
          <motion.div
            variants={container}
            whileInView={"show"}
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

          <div></div>
        </div>
      </div>
    </div>
  );
};
