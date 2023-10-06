import CourseSideBar from "@/components/CourseSideBar";
import { MiddleCourse } from "@/components/MiddleCourse";
import QuizCard from "@/components/QuizCard";
import { SelectorCourse } from "@/components/SelectorCourse";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type CoursePageProps = {
  params: {
    slug: string[];
  };
};

const CoursePage = async ({ params: { slug } }: CoursePageProps) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      units: {
        include: {
          chapters: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/gallery");
  }

  const unitIndex = parseInt(unitIndexParam);
  const chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];

  if (!unit) {
    return redirect("/gallery");
  }

  const chapter = unit.chapters[chapterIndex];

  if (!chapter) {
    return redirect("/gallery");
  }

  return (
    <div className="w-screen h-[calc(100vh-70px)] flex overflow-hidden relative">
      <SelectorCourse />

      {/* sidebar */}
      <CourseSideBar course={course} currentChapterId={chapter.id} />

      {/* middle */}
      <MiddleCourse
        unitIndex={unitIndex}
        chapterIndex={chapterIndex}
        course={course}
        chapter={chapter}
        unit={unit}
      />

      {/* quiz */}
      <QuizCard chapter={chapter} />
    </div>
  );
};

export default CoursePage;
