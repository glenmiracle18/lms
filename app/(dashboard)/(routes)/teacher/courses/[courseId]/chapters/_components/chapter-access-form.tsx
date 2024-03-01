"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

// interface props
interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

// form schema
const formSchema = z.object({
  isFree: z.boolean().default(false),
});

// functional component
const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  // state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isFree: !!initialData.isFree },
  });

  // form state
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  // form methods
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Access updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4 ">
      <div className="flex items-center justify-between font-medium">
        Free or Paid chapter?
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div>
          {/* in case the initial data actually exists */}
          {initialData.isFree ? (
            <p className="italic text-slate-500">
              Chapter is <span className="text-lg text-sky-700">Free</span>{" "}
            </p>
          ) : (
            <p className="italic text-slate-500">
              Chapter is <span className="text-lg text-purple-700">Paid</span>
            </p>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormDescription>
                    Check this box to make this chapter free for preview.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
