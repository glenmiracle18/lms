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
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { formatPrice } from "@/lib/format";

// interface props
interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

// form schema
const formSchema = z.object({
    price: z.coerce.number(),
});

// functional component
const PriceForm = ({
    initialData,
    courseId,
}: PriceFormProps) => {
    // state for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);

    // form hook
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined
        },
    });

    // form state
    const { isSubmitting, isValid }  = form.formState;
    const router = useRouter();

    // form methods
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated")
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    // find the selected option

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4 ">
            <div className="font-medium flex items-center justify-between">
                Add a price
                <Button variant="ghost" onClick={toggleEdit}>
                    {isEditing ? (
                        <>Cancel</>
                    ): (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Price
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "test-sm mt-2",
                    !initialData.price && "text-slate-500 italic"
                )}>
                    {initialData.price ? 
                        formatPrice(initialData.price)
                    : "No Price"}
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        className="space-y-4 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="Set a price for your course"
                                            {...field}
                                        />
                                    </FormControl>
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
    )
}

export default PriceForm