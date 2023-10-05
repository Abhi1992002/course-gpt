import React, { RefObject, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import clsx from "clsx";
import { Testing } from "../svg/Testing";

type StepperProps = {
  content: string;
  gradient_below: string;
  gradient_above: string;
  gradient_mid: string;
  id: number;
};

export const Stepper = ({
  content,
  gradient_below,
  gradient_above,
  gradient_mid,
  id,
}: StepperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-300px 0px -300px 0px",
    once: true,
  });

  const pararef = useRef(null);
  const isParaInView = useInView(pararef, {
    margin: "-300px 0px -300px 0px",
  });

  return (
    <>
      <motion.div
        ref={pararef}
        className="w-[85vw] flex lg:flex-row flex-col justify-center "
      >
        <div
          className={clsx(
            "flex-1 lg:min-w-[500px] bg-background mt-[50px] overflow-hidden rounded-lg transition-all ease-in-out duration-500  border h-[550px]  shadow-2xl",
            isParaInView ? "opacity-1" : "opacity-0"
          )}
        >
          {/* dynamic */}
          {isInView ? <Testing /> : ""}
        </div>
        <motion.div
          ref={ref}
          className="lg:w-[200px] w-[100%] mt-[30px] h-[100px] lg:h-auto  lg:mt-0 flex flex-col items-center"
        >
          <span
            className={clsx(
              `${gradient_above} w-[1px] transition-all ease-in-out duration-1000`,
              isInView ? "lg:h-[30%] h-[90%]" : "h-0"
            )}
          ></span>
          <span
            className={clsx(
              `w-5 rounded-full ${gradient_mid}  transition-all ease-in-out duration-1000 text-white flex items-center justify-center p-[16px] relative`,
              isInView ? "h-[20px] opacity-1" : "h-0 opacity-0"
            )}
          >
            {id + 1}

            <span
              className={clsx(
                `w-[40px] rounded-full ${gradient_mid}  transition-all ease-in-out duration-1000 text-white flex items-center justify-center p-[16px] absolute z-[-1] blur-xl`,
                isInView ? "h-[40px]" : "h-0"
              )}
            ></span>
          </span>

          <span
            className={clsx(
              `${gradient_below} hidden lg:flex transition-all ease-in-out duration-1000 w-[1px]`,
              isInView ? "h-[70%]" : "h-0"
            )}
          ></span>
        </motion.div>
        <motion.div
          ref={pararef}
          className="flex-1 pt-[50px] flex justify-center items-center text-center"
        >
          <motion.p
            className={clsx(
              "text-foreground/60  transition-all ease-in-out duration-500",
              isParaInView ? "opacity-1" : "opacity-0"
            )}
          >
            {content}
          </motion.p>
        </motion.div>
      </motion.div>
    </>
  );
};
