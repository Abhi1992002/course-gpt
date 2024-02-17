// /api/chapter/getInfo

import { prisma } from "@/lib/db";
import { getTranscript, searchYoutube } from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSummary } from "../../../../../action/create-summary";
import { createQuestion } from "../../../../../action/create-questions";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { chapterId } = bodyParser.parse(body);

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "chapter not found",
        },
        {
          status: 404,
        }
      );
    }

    const videoId = await searchYoutube(chapter.youtubeSearchQuery);

    let transcript = await getTranscript(videoId);

    const { summary } = await createSummary({ transcript });

    const question1Promise = createQuestion({ transcript, segment: "first" });
    const question2Promise = createQuestion({ transcript, segment: "second" });
    const question3Promise = createQuestion({ transcript, segment: "third" });
    const question4Promise = createQuestion({ transcript, segment: "fourth" });

    const questions = await Promise.all([
      question1Promise,
      question2Promise,
      question3Promise,
      question4Promise,
    ]);

    await prisma.question.createMany({
      data: questions.map((question) => {
        const options = [
          question.questions?.answer,
          question.questions?.option1,
          question.questions?.option2,
          question.questions?.option3,
        ];
        options.sort(() => Math.random() - 0.5);
        return {
          question: question.questions?.question!,
          answer: question.questions?.answer!,
          options: JSON.stringify(options),
          chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoId,
        summary: summary?.summary,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Body",
        },
        {
          status: 400,
        }
      );
    }
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
