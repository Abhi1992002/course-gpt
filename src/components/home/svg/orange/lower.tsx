import React from "react";

type LowerSvgOrangeProps = {};

export function LowerSvgOrange({}: LowerSvgOrangeProps) {
  return (
    <>
      <div className="w-[3px] h-[30vh] bg-gradient-to-t from-black to-orange-500" />
      <div className="home-campaign-glowing-icon-glow-2 w-[3px] h-[30vh] absolute left-[50%] bottom-0 translate-x-[50%]" />
    </>
  );
}
