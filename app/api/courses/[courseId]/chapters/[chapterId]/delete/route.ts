import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], //  This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    // desructured courseId and chapterId from params (easy)
    const { courseId, chapterId } = params;
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find the chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      // if the mux data exists, delete the video asset
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    const deleteChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(deleteChapter);
  } catch (error) {
    console.log("CHAPTER_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
