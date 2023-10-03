import React, { useEffect, useState } from "react";
import { Stepper } from "./Stepper";
import { stepperData } from "./stepData";

type StepsProps = {};

export const Steps = ({}: StepsProps) => {
  return (
    <div className="w-screen flex flex-col items-center">
      <h1 className="animate-gradient text-foreground inline-block bg-clip-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl w-[90vw] sm:w-[60vw] text-center font-extrabold pb-[20px]">
        How to Create?
      </h1>

      <div className="w-screen pb-[300px] flex flex-col items-center mt-[100px]">
        {stepperData.map((stepper, _id) => {
          return (
            <>
              <Stepper
              id={_id}
                key={_id}
                content={stepper.content}
                gradient_below={stepper.gradient_below}
                gradient_mid={stepper.gradient_mid}
                gradient_above={stepper.gradient_above}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
