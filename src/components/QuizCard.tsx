"use client"
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type QuizCardProps = {
  chapter: Chapter & {
    questions: Question[];
  };
};

const QuizCard = ({ chapter }: QuizCardProps) => {

    const [answer , setAnswer] = React.useState<Record<string , string>>({})

    const [questionState , setQuestionState] = React.useState<Record<string, boolean>>({})

    const checkAnswers = React.useCallback(()=> {
        const newQuestionState = {...questionState}
        chapter.questions.forEach(question => {
            const user_answer = answer[question.id]
            if(!user_answer) return 
            if(user_answer === question.answer){
                newQuestionState[question.id] = true
            }
            else{
                newQuestionState[question.id] = false
            }
            setQuestionState(newQuestionState)
        }) 
    },[answer,questionState,chapter.questions])
  return (
    <div className="flex-[1] mt-16 ml-8">
      <h1 className="text-2xl font-bold">Concept Check</h1>
      <div className="mt-4">
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn("p-3 mt-4 border border-secondary rounded-lg",{
                'bg-green-700': questionState[question.id] === true,
                'bg-red-700': questionState[question.id] === false,
                'bg-secondary': questionState[question.id] === null,
              })}
            >
              <h1 className="text-lg font-semibold">{question.question}</h1>
              <div className="mt-2">
                <RadioGroup 
                onValueChange={(e) => {
                    setAnswer((prev) => {
                        return {
                            ...prev,
                            [question.id] : e,
                        }
                    })
                }}
                >
                  {options.map((option, index) => {
                    return (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                          id={question.id + index.toString()}
                          value={option}
                        />
                          <Label htmlFor={question.id + index.toString()}>
                            {option}
                          </Label>
                       
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
        <Button className="w-full mt-2" size={'lg'} onClick={checkAnswers}>
            check answer
            <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
