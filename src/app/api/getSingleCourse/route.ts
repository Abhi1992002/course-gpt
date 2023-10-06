import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  search: z
    .string()
    .min(0)
    .max(50),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { search } = bodyParser.parse(body);

    if (search === "") {
      const courses = await prisma.course.findMany({
        include: {
          units: {
            include: {
              course: true,
            },
          },
        },
      });

      return NextResponse.json({ courses }, { status: 200 });
    }

    const courses = await prisma.course.findMany({
      where: {
        name: search,
      },
      include: {
        units: {
          include: {
            course: true,
          },
        },
      },
    });

    // const courses = await prisma.course.deleteMany({});

    // console.log("delete successful");

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "unknown",
      },
      {
        status: 500,
      }
    );
  }
}
