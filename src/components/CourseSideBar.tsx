"use client";

import { cn } from "@/lib/utils";
import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import clsx from "clsx";
import { useRecoilValue } from "recoil";
import { toggleState } from "@/state/toggleCourse";
import { Separator } from "./ui/separator";

type CourseSideBarProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

function CourseSideBar({ course, currentChapterId }: CourseSideBarProps) {
  const toggleValue = useRecoilValue(toggleState);

  return (
    <div
      className={clsx(
        "flex-1 border-r-1  pt-[30px] items-center justify-center",
        toggleValue === "navigation" ? "lg:flex" : "hidden lg:flex"
      )}
    >
      <ScrollShadow className="w-[95%] mx-auto h-[100%] overflow-auto">
        <div className="w-[100%] h-[100%]">
          <h1 className="text-4xl font-bold">{course.name}</h1>
          {course.units.map((unit, unitIndex) => (
            <div key={unit.id} className="mt-4">
              <h2 className="text-sm uppercase text-secondary-foreground/60">
                Unit {unitIndex + 1}
              </h2>
              <h2 className="text-xl font-bold">{unit.name}</h2>
              {unit.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                    className={cn("text-secondary-foreground/60", {
                      "text-green-500": chapter.id === currentChapterId,
                    })}
                  >
                    {chapter.name}
                  </Link>
                </div>
              ))}

              <Separator className="mt-2 text-gray-500" />
            </div>
          ))}
        </div>
      </ScrollShadow>
    </div>
  );
}

export default CourseSideBar;
