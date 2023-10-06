"use client";

import { Chapter, Course, Unit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";
import { Separator } from "./ui/separator";
import { Button, buttonVariants } from "./ui/button";

type ConfirmChaptersProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

function ConfirmChapters({ course }: ConfirmChaptersProps) {
  const [loading, setLoading] = React.useState(false);
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};

  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });

  const [completeChapters, setCompleteChapters] = React.useState<Set<String>>(
    new Set()
  );

  // it goes to each unit ans add the units in total
  const totalChapterCount = React.useMemo(
    () => course.units.reduce((acc, unit) => acc + unit.chapters.length, 0),
    [course.units]
  );

  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => (
        <div key={unit.id} className="mt-5">
          <h2 className="text-sm uppercase text-secondary-foreground/60">
            Unit {unitIndex + 1}
          </h2>
          <h3 className="text-2xl font-bold">{unit.name}</h3>
          <div className="mt-3">
            {unit.chapters.map((chapter, chapterIndex) => (
              <ChapterCard
                completeChapters={completeChapters}
                setCompleteChapters={setCompleteChapters}
                ref={chapterRefs[chapter.id]}
                key={chapter.id}
                chapter={chapter}
                chapterIndex={chapterIndex}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>

          {totalChapterCount === completeChapters.size ? (
            <Link
              className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${course.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              disabled={loading}
              type="button"
              className="ml-4 font-semibold"
              onClick={() => {
                setLoading(true);
                Object.values(chapterRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              Generate
              <ChevronRight className="w-4 h-4 mr-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
}

export default ConfirmChapters;
