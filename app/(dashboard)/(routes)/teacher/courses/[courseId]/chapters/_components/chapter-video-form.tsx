"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FileUpload } from "@/components/file-upload";
import { Chapter, MuxData } from "@prisma/client";
import { VideoIcon } from "@radix-ui/react-icons";
import MuxPlayer from "@mux/mux-player-react";

// interface props
interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

// form schema
const formSchema = z.object({
  videoUrl: z.string().min(1),
});

// functional component
const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  // state for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: initialData.videoUrl || "",
    },
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
      toast.success("Chapter video added");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4 ">
      <div className="flex items-center justify-between font-medium">
        Upload a video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <VideoIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          // fetch and display video from uploadthing
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="mt-4">
            <h1 className="text-muted-forground text-xs">
              Uploading videos might take a while. If video is not displayed
              please reload this page.
            </h1>
            <p className="text-muted-foreground mt-2 italic text-sky-700">
              (16:9 and aspect ratio and 30fps is recommended)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
