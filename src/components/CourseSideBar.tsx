"use client"
import { cn } from "@/lib/utils";
import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import {ScrollShadow} from "@nextui-org/react";

type CourseSideBarProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId:string
};

const CourseSideBar = async ({ course ,currentChapterId}: CourseSideBarProps) => {
  return (
   <ScrollShadow className="w-[100%] h-[100%]" hideScrollBar>
    <div className="w-[100%] h-[100%]">
      <h1 className="text-4xl font-bold">{course.name}</h1>
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-4">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h2 className="text-xl font-bold">{unit.name}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                    className={
                        cn('text-secondary-foreground/60',{
                            "text-green-500" : chapter.id === currentChapterId
                        })
                    }
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div key={chapter.id}>
                  <Link
                    href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                    className={
                        cn('text-secondary-foreground/60',{
                            "text-green-500" : chapter.id === currentChapterId
                        })
                    }
                  >
                    {chapter.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 text-gray-500"/>
          </div>
        );
      })}
    </div>
    </ScrollShadow> 
  );
};

export default CourseSideBar;
