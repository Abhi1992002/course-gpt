import { Gallery } from "@/components/Gallery";
import { GallerySearch } from "@/components/GallerySearch";
import Background from "@/components/background/page";
import { prisma } from "@/lib/db";

import React from "react";

const GalleryPage = async () => {
  const courses = await prisma.course.findMany({
    include: {
      units: {
        include: {
          chapters: true,
        },
      },
    },
  });

  return (
    <div className="py-auto mx-auto max-w-8xl">
      <Background />
      <div className="flex flex-col items-center justify-center w-[100%] pt-[100px]">
        <h1 className="animate-gradient bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text text-4xl md:text-6xl sm:text-5xl  lg:text-7xl xl:text-8xl w-[90vw] sm:w-[60vw] text-center font-extrabold pb-[20px] ">
          Gallery
        </h1>
        <GallerySearch courses={courses} />
      </div>
      <div className="flex gap-4 flex-wrap items-center justify-center mt-[100px]">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
