"use client";

import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { useRecoilValue } from "recoil";
import { toggleState } from "@/state/toggleCourse";
import clsx from "clsx";
import { ScrollShadow } from "@nextui-org/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

type QuizCardProps = {
  chapter: Chapter & {
    questions: Question[];
  };
};

function QuizCard({ chapter }: QuizCardProps) {
  const [answer, setAnswer] = React.useState<Record<string, string>>({});

  const [questionState, setQuestionState] = React.useState<
    Record<string, boolean>
  >({});

  const checkAnswers = React.useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const user_answer = answer[question.id];
      if (!user_answer) return;
      if (user_answer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }
      setQuestionState(newQuestionState);
    });
  }, [answer, questionState, chapter.questions]);

  const toggleValue = useRecoilValue(toggleState);

  return (
    <div
      className={clsx(
        "flex-1 pt-[30px] lg:flex  justify-center",
        toggleValue === "quiz" ? "lg:flex" : "hidden lg:flex"
      )}
    >
      <ScrollShadow className="w-[100%] pb-[50px]" hideScrollBar>
        <div className="w-[95%] mx-auto">
          <h1 className="text-2xl font-bold">Concept Check</h1>
          <div className="mt-4">
            {chapter.questions.map((question) => {
              const options = JSON.parse(question.options) as string[];
              return (
                <div
                  key={question.id}
                  className={cn("p-3 mt-4 border border-secondary rounded-lg", {
                    "bg-green-700": questionState[question.id] === true,
                    "bg-red-700": questionState[question.id] === false,
                    "bg-secondary": questionState[question.id] === null,
                  })}
                >
                  <h1 className="text-lg font-semibold">{question.question}</h1>
                  <div className="mt-2">
                    <RadioGroup
                      onValueChange={(e) => {
                        setAnswer((prev) => ({
                          ...prev,
                          [question.id]: e,
                        }));
                      }}
                    >
                      {options.map((option, index) => (
                        <div
                          className="flex items-center space-x-2"
                          key={index}
                        >
                          <RadioGroupItem
                            id={question.id + index.toString()}
                            value={option}
                          />
                          <Label htmlFor={question.id + index.toString()}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              );
            })}
            <Button
              className="w-full mt-2 bg-foreground text-background"
              size="lg"
              onClick={checkAnswers}
            >
              check answer
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}

export default QuizCard;
