import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";
import { GalleryCourseCard } from "./GalleryCourseCard";

type courseProp = Course & {
  units: (Unit & {
    chapters: Chapter[];
  })[];
};
type courseType = {
  courses: (Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  })[];
};

export default function Gallery({ courses }: courseType) {
  return (
    <>
      {courses.length > 0 ? (
        <>
          {courses.map((course: courseProp) => (
            <GalleryCourseCard course={course} key={course.id} />
          ))}
        </>
      ) : (
        <p>No such course</p>
      )}
    </>
  );
}
