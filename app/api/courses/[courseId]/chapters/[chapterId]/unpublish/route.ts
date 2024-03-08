import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    // double security check
    if (!userId) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    // verifying course Owner
    const isOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    // restricting non course owners to publish
    if (!isOwner) {
      return new NextResponse("UnAuthorized", { status: 401 });
    }

    // actual course publication
    // find the chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    // find the muxData
    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });

    // prevent publishing if there is none of the below requirements fufilled
    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // publication function
    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 401 });
  }
}
