// /api/couse/createChapters

import { NextResponse } from "next/server";
import { MutationTypeSchema, createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";
import { createCourse } from "../../../../../action/create-course";
import { createImageQuery } from "../../../../../action/create-image-query";

type CourseType = {
  chapter_title: string;
  youtube_search_query: string;
}[];

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const isPro = await checkSubscription();
    if (session.user.credits <= 0 && !isPro) {
      return new NextResponse("no credits", { status: 402 });
    }

    const body = await req.json();
    const { title, units } = createChaptersSchema.parse(body);

    const createCoursePromise = units.map((unit) =>
      createCourse({ unit: unit, title: title })
    );
    type Chapter = {
      [x: string]: string;
    };

    const { image } = await createImageQuery({ title });

    const course_image = await getUnsplashImage(image?.image_url as string);

    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image!,
      },
    });

    const response = await Promise.all(createCoursePromise);

    units.forEach(async (unit, unitIndex) => {
      const unitdb = await prisma.unit.create({
        data: {
          name: unit,
          courseId: course.id,
        },
      });

      console.log(response[unitIndex].courses?.[2]?.[0]);

      await prisma.chapter.createMany({
        data: [
          {
            name:
              response[unitIndex].courses?.[0].chapter_title ||
              response[unitIndex].courses?.[0]?.[0]!,
            youtubeSearchQuery:
              response[unitIndex].courses?.[0].youtube_search_query ||
              response[unitIndex].courses?.[0]?.[1]!,
            unitId: unitdb.id,
          },
          {
            name:
              response[unitIndex].courses?.[1].chapter_title ||
              response[unitIndex].courses?.[1]?.[0]!,
            youtubeSearchQuery:
              response[unitIndex].courses?.[1].youtube_search_query ||
              response[unitIndex].courses?.[1]?.[1]!,
            unitId: unitdb.id,
          },
          {
            name:
              response[unitIndex].courses?.[2].chapter_title ||
              response[unitIndex].courses?.[2]?.[0]!,
            youtubeSearchQuery:
              response[unitIndex].courses?.[2].youtube_search_query ||
              response[unitIndex].courses?.[2]?.[1]!,
            unitId: unitdb.id,
          },
        ],
      });
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({
      success: "Course created successfully",
      courseId: course.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    return new NextResponse("Getting some error, Please try again", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {}
