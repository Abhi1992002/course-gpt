"use client";

import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

type ChapterCardProps = {
  chapter: Chapter;
  chapterIndex: number;
  completeChapters: Set<String>;
  setCompleteChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterCardHandler, ChapterCardProps>(
  ({ chapter, chapterIndex, completeChapters, setCompleteChapters }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = useState<boolean | null>(null);

    const { mutate: getChapterinfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    // it memorize the function and have value if i do rerender
    const addChapterIdToSet = React.useCallback(() => {
      setCompleteChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompleteChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet;
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        // if i have already generated the videoId then course already created
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }

        // sending
        getChapterinfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: () => {
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading your chapter",
              variant: "destructive",
            });
            addChapterIdToSet();
          },
        });
      },
    }));

    return (
      <div
        key={chapter.id}
        className={cn("px-4 py-2 mt-2 rounded justify-between", {
          "bg-secondary": success === null,
          "bg-red-500": success === false,
          "bg-green-500": success === true,
        })}
      >
        <h5>
          Chapter {chapterIndex + 1} : {chapter.name}
          {isLoading && <Loader2 className="animate-spin" />}
        </h5>
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
