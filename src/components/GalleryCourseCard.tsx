"use client";

import React, { useState } from "react";
import { Card, CardBody, Image, ScrollShadow } from "@nextui-org/react";
import { Chapter, Course, Unit } from "@prisma/client";
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
      className="border-1 scroll-container transition-all duration-500 ease-in-out  bg-background dark:bg-background max-h-[400px] h-[400px] max-w-[340px] w-[340px] pt-[10px] pb-[10px]
      "
      shadow="sm"
    >
      <ScrollShadow className="w-[340px] h-[400px]">
        <CardBody>
          <div className="grid grid-cols-1  items-center justify-center">
            <Link
              href={`/course/${course.id}/0/0`}
              className="relative overflow-hidden h-[100%] w-[100%] "
            >
              <Image
                alt="Album cover"
                className="object-cover h-[100%] w-[100%] z-[-1]"
                height={200}
                shadow="md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVaxs3qBS_MeNaG5dioG8xKand1IJoBULoNm3UmqQHg&s"
                width="100%"
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
            </div>
          </div>
        </CardBody>
      </ScrollShadow>
    </Card>
  );
}
