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
    });

    if (!course) {
      return new NextResponse("CourseNotFound", { status: 404 });
    }

    // publication function
    const unpublishedCourse = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH", error);
    return new NextResponse("Internal Server Error", { status: 401 });
  }
}
