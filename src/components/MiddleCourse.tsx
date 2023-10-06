"use client";

import React, { useEffect, useState } from "react";
import { Chapter, Course, Unit } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { toggleState } from "@/state/toggleCourse";
import { MainVideoSummary } from "./MainVideoSummary";

type MiddleCourseProps = {
  unit: Unit & {
    chapters: Chapter[];
  };
  chapterIndex: number;
  chapter: Chapter;
  unitIndex: number;
  course: Course;
};

export function MiddleCourse({
  unit,
  chapterIndex,
  chapter,
  unitIndex,
  course,
}: MiddleCourseProps) {
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];
  const toggleValue = useRecoilValue(toggleState);

  return (
    <div
      className={clsx(
        "flex-2 pt-[30px] lg:pt-[30px] sm:pt-[80px] border-r-1 flex flex-col",
        toggleValue === "Video-page" ? "lg:flex" : "hidden lg:flex"
      )}
    >
      <div className="flex-1 flex items-center overflow-auto flex-col">
        <MainVideoSummary
          chapter={chapter}
          chapterIndex={chapterIndex}
          unitIndex={unitIndex}
          unit={unit}
        />
        {/* for navigation */}
        <div className="w-[100%] h-[100px] border-t-1 flex items-center justify-center">
          <div className="w-[100%] flex justify-between px-[20px]">
            {/* previous page */}
            <div className="flex items-center">
              {prevChapter && (
                <Link
                  href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                  className="flex mr-auto w-fit"
                >
                  <div className="flex items-center">
                    <ChevronLeft className="w-6 h-6 mr-1" />
                    <div className="flex flex-col items-start">
                      <span className="text-xl text-foreground">Previous</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* next page */}
            <div className="flex items-center">
              {nextChapter && (
                <Link
                  href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                  className="flex"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-xl text-foreground">Next</span>
                    <ChevronRight className="w-6 h-6 mr-1" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
}
