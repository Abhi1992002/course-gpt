"use client";

import React, { useState } from "react";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { Chapter, Course, Unit } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { courseState } from "@/state/courses";

type GalleryCourseCardProps = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

export function GalleryCourseCard({ course }: GalleryCourseCardProps) {
  return (
    <Card
      isBlurred
      className="border-1 scroll-container transition-all duration-500 ease-in-out  bg-background dark:bg-background  h-auto md:h-[400px] max-w-[340px] w-[340px] pt-[10px] pb-[10px]
      "
      shadow="sm"
    >
      <ScrollShadow className="w-[340px] h-auto md:h-[400px]">
        <CardBody>
          <div className="grid grid-cols-1  items-center justify-center w-[100%] h-[100%]">
            <Link
              href={`/course/${course.id}/0/0`}
              className="relative overflow-hidden h-[200px] w-[100%] "
            >
              <Image
                alt="Album cover"
                className="object-cover z-[-1]"
                height={200}
                width={340}
                loading="eager"
                src={course.image}
              />
              <span className="z-[1] absolute hover:scale px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-4 left-4 right-2">
                {course.name}
              </span>
            </Link>
            <div className="flex flex-col col-span-6 mt-[30px] md:col-span-8 overflow-hidden">
              {course.units.map((unit, i) => (
                <Link
                  href={`course/${course.id}/${i}/0`}
                  className="hover:text-green-500"
                >
                  {unit.name}
                </Link>
              ))}
              {course.units.map((unit, i) => (
                <Link
                  href={`course/${course.id}/${i}/0`}
                  className="hover:text-green-500"
                >
                  {unit.name}
                </Link>
              ))}
            </div>
          </div>
        </CardBody>
      </ScrollShadow>
    </Card>
  );
}
