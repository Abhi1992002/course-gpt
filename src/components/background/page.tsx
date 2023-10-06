import React from "react";

type BackgroundProps = {};

function Background({}: BackgroundProps) {
  return (
    <div className="w-screen h-screen fixed top-0 pointer-events-none flex items-center justify-center">
      <div className="w-[300px] h-[300px] animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full blur-[150px]" />
    </div>
  );
}

export default Background;
