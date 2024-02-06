"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormLabel,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

// you can find all this form complexity in the shadcn library online
// https://ui.shadcn.com/docs/components/form

// form schema
const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

// main functional component
const Create = () => {
  // typechecker for the entire form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // verifying the state is the form is still submitiing or has alreader submited
  const { isSubmitting, isValid } = form.formState;

  // onsubmint functionalities
  const onSubmint = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl">Name Your Course</h1>
        <p className="text-sm text-slate-500">
          What would you like to name your course? Don&apos;t worry you can
          change this later
        </p>

        {/* form ui */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmint)}
            className="mt-8 space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Introduction to AI'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What would you like to name this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Create;
