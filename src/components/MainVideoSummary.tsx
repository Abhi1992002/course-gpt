"use client";

import { ScrollShadow } from "@nextui-org/react";
import { Chapter, Unit } from "@prisma/client";
import React from "react";

type MainVideoSummaryProps = {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
};

export function MainVideoSummary({
  unit,
  unitIndex,
  chapter,
  chapterIndex,
}: MainVideoSummaryProps) {
  return (
    <ScrollShadow className="w-[95%] h-[100%]" hideScrollBar>
      <div className="w-[100%] mt-[40px] sm:m-0">
        <h4 className="text-sm uppercase text-secondary-foreground/60">
          Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
        </h4>
        <h1 className="text-2xl sm:text-4xl font-bold">{chapter.name}</h1>
        <iframe
          title="chapter-video"
          className="border-1 border-white w-full mt-4 aspect-video max-h-[24rem] rounded-xl"
          src={`https://www.youtube.com/embed/${chapter.videoId}`}
          allowFullScreen
        />
        <div className="mt-4">
          <h3 className="text-xl sm:text-3xl font-semibold">Summary</h3>
          <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
        </div>
      </div>
    </ScrollShadow>
  );
}
