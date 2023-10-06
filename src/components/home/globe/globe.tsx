import React from "react";
import GlobeClient from "./globe-client";

type GlobeProps = {};

export function Globe({}: GlobeProps) {
  return (
    <div>
      <GlobeClient />
    </div>
  );
}
