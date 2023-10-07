"use client";

import { courseState } from "@/state/courses";
import { Course } from "@prisma/client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { galleryLoadingState } from "@/state/galleryLoading";

const searchSchema = z.object({
  search: z
    .string()
    .min(0)
    .max(50),
});

type SearchInput = z.infer<typeof searchSchema>;

export default function GallerySearch() {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const { mutate: getCourses } = useMutation({
    mutationFn: async ({ search }: SearchInput) => {
      const response = await axios.post(
        "/api/getSingleCourse",
        {
          search,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });

  const setCourse = useSetRecoilState(courseState);
  const setLoading = useSetRecoilState(galleryLoadingState);
  async function onSubmit(values: z.infer<typeof searchSchema>) {
    setLoading(false);
    getCourses(values, {
      onSuccess: (data) => {
        setTimeout(() => {
          setCourse(data);
          setLoading(true);
        }, 700);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className="pt-[50px] w-[100%] max-w-4xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center sm:flex-row flex-col"
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex-1 w-[90%] sm:w-auto sm:pl-[30px] mb-[10px] sm:mb-0">
                <FormControl>
                  <Input
                    className="pl-[30px] border-2 border-foreground py-[10px]"
                    placeholder="search courses"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-[90%] sm:w-auto sm:ml-[30px] bg-foreground text-background"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
