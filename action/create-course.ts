"use server";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

export const createCourse = async ({
  unit,
  title,
}: {
  unit: string;
  title: string;
}) => {
  try {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      chapter_title: "one chapter in the unit",
      youtube_search_query:
        "best youtube query for the chapter_title so he can confirm his concepts",
    });

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        "Answer the users question as best as possible.\n{format_instructions}\n{question}"
      ),
      new OpenAI({ temperature: 0 }),
      parser,
    ]);

    const request1 = chain.invoke({
      question: `The title of course is ${title}, It has a unit named ${unit}. I want to create a chapter which tell about the basics of the unit , so name chapter accordingly`,
      format_instructions: parser.getFormatInstructions(),
    });

    const request2 = chain.invoke({
      question: `The title of course is ${title}, It has a unit named ${unit}. I want to create a chapter which tell about the intermediate stuff of the unit , so name chapter accordingly`,
      format_instructions: parser.getFormatInstructions(),
    });

    const request3 = chain.invoke({
      question: `The title of course is ${title}, It has a unit named ${unit}. I want to create a chapter which tell about the advance stuff of the unit , so name chapter accordingly`,
      format_instructions: parser.getFormatInstructions(),
    });

    const courses = await Promise.all([request1, request2, request3]);

    return { success: "success", courses: courses };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
