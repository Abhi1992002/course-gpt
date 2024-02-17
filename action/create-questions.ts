"use server";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";

export const createQuestion = async ({
  transcript,
  segment,
}: {
  transcript: string;
  segment: "first" | "second" | "third" | "fourth";
}) => {
  try {
    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      question:
        "relevant question for this chapter , create 4 option , out of which one is corrct and all other is wrong and put those into below keys ",
      answer: "1st option ,  and this is right answer",
      option1: "2nd option , and this option is wrong",
      option2: "3rd option , and this option is wrong",
      option3: "4th option , and this option is wrong",
    });

    const segmentLength = Math.floor(transcript.length / 4);
    let segmentText = "";
    switch (segment) {
      case "first":
        segmentText = transcript.slice(0, segmentLength);
        break;
      case "second":
        segmentText = transcript.slice(segmentLength, 2 * segmentLength);
        break;
      case "third":
        segmentText = transcript.slice(2 * segmentLength, 3 * segmentLength);
        break;
      case "fourth":
        segmentText = transcript.slice(3 * segmentLength);
        break;
    }

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        "Answer the users question as best as possible.\n{format_instructions}\n{question}"
      ),
      new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo-1106" }),
      parser,
    ]);

    const request = await chain.invoke({
      question: `Create a question and answer object with 4 options out of which one is correct. The topic is based on the following content segment: ${segmentText}`,
      format_instructions: parser.getFormatInstructions(),
    });

    return { success: "success", questions: request };
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
