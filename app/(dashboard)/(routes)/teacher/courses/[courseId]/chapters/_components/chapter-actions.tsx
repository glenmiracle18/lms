"use client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ChapterActionsProps {
  isPublished: boolean;
  chapterId: string;
  courseId: string;
  disabled: boolean;
}

export const ChapterActions = ({
  isPublished,
  chapterId,
  courseId,
  disabled,
}: ChapterActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`,
        );
        toast.success("Chapter Published");
        router.refresh();
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`,
        );
        toast.success("Chapter Unpublished");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/delete`,
      );
      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={isLoading || disabled}
      >
        {!isPublished ? "Publish" : "Unpublish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant="default" size="sm" disabled={isLoading || disabled}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
