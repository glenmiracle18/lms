import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

// creating a new mux asset
const mux = new Mux({
  tokenId: process.env["MUX_TOKEN_ID"], //  This is the default and can be omitted
  tokenSecret: process.env["MUX_TOKEN_SECRET"], // This is the default and can be omitted
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    const { isPublished, ...values } = await req.json();

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

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    // handle video upload

    // check if videoUrl alreary exists using db.findFirst and storing it to existingMuxData
    if (values.videoUrl) {
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

      // create a new asset
      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      // also create the mux data asset
      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("CHAPTERID_TITLE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
