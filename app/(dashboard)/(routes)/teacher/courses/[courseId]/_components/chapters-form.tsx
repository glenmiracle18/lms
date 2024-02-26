"use client"
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Course, Chapter } from "@prisma/client";

// interface props
interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}

// form schema
const formSchema = z.object({
    title: z.string().min(1),
});

// functional component
const ChaptersForm = ({
    initialData,
    courseId,
}: ChaptersFormProps) => {
    // state for editing mode
    const [isCreating, setIsCreating] = useState(false);
    const toggleCreating = () => setIsCreating((current) => !current);

    // form hook
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    // form state
    const { isSubmitting, isValid }  = form.formState;
    const router = useRouter();

    // form methods
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created")
            toggleCreating();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
            <div className="font-medium flex items-center justify-between">
                Create a chapter
                <Button variant="ghost" onClick={toggleCreating}>
                    {isCreating ? (
                        <>Cancel</>
                    ): (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Edit chapters
                        </>
                    )}
                </Button>
            </div>
            
            {isCreating && (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g Introdcution to your course.."
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Create
                            </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn("text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "No Chapters!"}

                    {/* TODO: Add a list of chapters */}
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and move to reorder the chapters
                </p>
            )}
        </div>
    )
}

export default ChaptersForm