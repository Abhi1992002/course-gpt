"use server";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";

export const createImageQuery = async ({ title }: { title: string }) => {
  try {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      image_url:
        "image url which suited my title and i can search it on unsplash",
    });

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        "Answer the users question as best as possible.\n{format_instructions}\n{question}"
      ),
      new OpenAI({ temperature: 0 }),
      parser,
    ]);

    const request = await chain.invoke({
      question: `create image for the titlr : ${title}`,
      format_instructions: parser.getFormatInstructions(),
    });

    return { success: "success", image: request };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
