"use server";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";

export const createSummary = async ({ transcript }: { transcript: string }) => {
  try {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      summary: "a crisp summary of transcript that i will provide",
    });

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        "Answer the users question as best as possible.\n{format_instructions}\n{question}"
      ),
      new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo-1106" }),
      parser,
    ]);

    const request = await chain.invoke({
      question: `Create summary of youtube transcript in less than 300 words. Do not talk of sponsor or anything unrealted to main topic , also do not introduce what the summary is about.\n${transcript}`,
      format_instructions: parser.getFormatInstructions(),
    });

    console.log(request);

    return { success: "success", summary: request };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
