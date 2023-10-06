"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetRecoilState } from "recoil";
import { toggleState } from "@/state/toggleCourse";

type SelectorCourseProps = {};

export function SelectorCourse({}: SelectorCourseProps) {
  const setToggleValue = useSetRecoilState(toggleState);

  const changeState = (e: string) => {
    setToggleValue(e);
  };

  return (
    <div className="lg:hidden bg-background flex items-center w-[100%] pb-[20px] absolute justify-center z-[1]">
      <div className="w-[95%]">
        <Select onValueChange={(e) => changeState(e)}>
          <SelectTrigger className="w-[180px] mt-[10px] border-1 border-foreground">
            <SelectValue placeholder="Video-page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Video-page">Video-page</SelectItem>
            <SelectItem value="navigation">navigation</SelectItem>
            <SelectItem value="quiz">quiz</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
