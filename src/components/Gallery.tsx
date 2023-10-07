"use client";

import { Chapter, Course, Unit } from "@prisma/client";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { courseState } from "@/state/courses";
import { Loader2 } from "lucide-react";
import { galleryLoadingState } from "@/state/galleryLoading";
import { GalleryCourseCard } from "./GalleryCourseCard";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type courseProp = Course & {
  units: (Unit & {
    chapters: Chapter[];
  })[];
};

export default function Gallery() {
  const [courseList, setCourseList] = useRecoilState<any>(courseState);

  const [loading, setLoading] = useRecoilState(galleryLoadingState);

  const { mutate: getCourses } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "/api/getSingleCourse",
        {
          search: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  useEffect(() => {
    setLoading(false);
    getCourses(undefined, {
      onSuccess: (data) => {
        setCourseList(data);
        setLoading(true);
      },
      onError: () => {
        console.log("error");
      },
    });
  }, []);

  return (
    <>
      {courseList.courses && (
        <>
          {loading ? (
            <>
              {courseList.courses.length > 0 ? (
                <>
                  {courseList.courses.map((course: courseProp) => (
                    <GalleryCourseCard course={course} key={course.id} />
                  ))}
                </>
              ) : (
                <p>No such course</p>
              )}
            </>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </>
      )}
    </>
  );
}
