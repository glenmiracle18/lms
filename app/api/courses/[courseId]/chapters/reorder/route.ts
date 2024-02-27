import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth()
        const { list } = await req.json()

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // checking if the current user is the course owner
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        })

        if(!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // updating the chapters order
        for (let item of list) {
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            })
        }


        // returning the reorder status
        return NextResponse.json("Succes", { status: 200 })

    } catch (error) {
        console.log("CHAPTER_REORDER: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}