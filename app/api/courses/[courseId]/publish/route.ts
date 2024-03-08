import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    const { courseId } = params;

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
    // find the course
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("CourseNotFound", { status: 404 });
    }

    // handle chapter publication use cases
    const hasPublishedChapter = course.chapters.some(
      (chapter) => chapter.isPublished,
    );

    // edge cases
    if (
      !course.title ||
      !course.description ||
      !course.categoryId ||
      !course.imageUrl
    ) {
      return new NextResponse("Missing Required Fields", { status: 401 });
    }

    // publication function
    const publishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 401 });
  }
}
