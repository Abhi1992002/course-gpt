import React from "react";
import Marquee from "react-fast-marquee";

type MarqueeProps = {};

export function MarqueeClient({}: MarqueeProps) {
  return (
    <div className="relative border border-foreground">
      <div className="w-screen bg-white/0 backdrop-blur-sm ">
        <Marquee
          className="h-[100px] text-foreground"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
          <span className="text-2xl font-bold ml-12">COURSERA</span>
        </Marquee>
      </div>
    </div>
  );
}
