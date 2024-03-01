import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, EyeIcon, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "../_components/chapter-title-form";
import ChapterDescriptionForm from "../_components/chapter-description-form";
import ChapterAccessForm from "../_components/chapter-access-form";
import ChapterVideoForm from "../_components/chapter-video-form";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  // returns to home page if there is no user
  if (!userId) {
    return redirect("/");
  }

  // get the chapters
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  // returns to home page if there is no courseId
  if (!chapter) {
    redirect("/");
  }

  // required fields
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className="mb-6 flex items-center text-sm transition hover:opacity-75"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to course setup
          </Link>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="font-meduim text-2xl">Chapter Creation</h1>
              <span className="text-sm text-slate-700">
                Complete all fields ({completionText}) before saving the
                chapter.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your chapter details</h2>
            </div>
            {/* chapter title form */}
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">Access settings</h2>
          </div>
          {/* access form */}
          <ChapterAccessForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h1 className="text-xl">Upload a Video </h1>
          </div>
          <ChapterVideoForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
