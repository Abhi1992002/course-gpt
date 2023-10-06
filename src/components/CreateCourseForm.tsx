"use client";

import React from "react";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import SubscriptionAction from "./SubscriptionAction";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState } from "@/state/loading";

type CreateCourseFormProps = {
  isPro: boolean;
};

type Input = z.infer<typeof createChaptersSchema>;

export function CreateCourseForm({ isPro }: CreateCourseFormProps) {
  const router = useRouter();

  // it is used for data fetching and do auto updating if something change on server side
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, units }: Input) => {
      const response = await axios.post(
        "/api/course/createChapters",
        {
          title,
          units,
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

  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const [loading, setLoading] = useRecoilState(loadingState);

  const { toast } = useToast();

  const onSubmit = (data: Input) => {
    if (data.units.some((unit) => unit === "")) {
      toast({
        title: "Error",
        description: "Please Fill all the units",
        variant: "destructive",
      });
    }
    setLoading(true);
    // whe we call createChapters => it hit the endpoint
    createChapters(data, {
      onSuccess: ({ course_id }) => {
        toast({
          title: "success",
          description: "course creates successfully",
        });
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          description:
            "Sorry, I think I have reached my api's maximum limit, so u can explore the courses created by other users on gallery",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                <FormLabel className="flex-[1] text-xl">Title</FormLabel>
                <FormControl className="flex-[6]">
                  <Input
                    placeholder="Enter the main topic of the course"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: "0" }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
                  height: { duration: 0.2 },
                }}
              >
                <FormField
                  key={index}
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                      <FormLabel className="flex-[1] text-xl">
                        Unit {index + 1}
                      </FormLabel>
                      <FormControl className="flex-[6]">
                        <Input
                          placeholder="Enter subtopic of the course"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
              >
                Add Unit
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
              >
                Remove Unit
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6 bg-foreground/90 hover:bg-foreground"
            size="lg"
          >
            Create Course
            {loading && <Loader2 className="animate-spin w-4 ml-[20px]" />}
          </Button>
        </form>
      </Form>
      {!isPro && <SubscriptionAction />}
    </div>
  );
}
