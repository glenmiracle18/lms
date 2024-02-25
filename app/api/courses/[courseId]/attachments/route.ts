import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth()
        const { url } = await req.json()

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

        const attachments = await db.attachment.create({
            data: {
                url,
                courseId: params.courseId,
                name: url.split("/").pop()
            }
        });

        // returning the attachments
        return NextResponse.json(attachments)

    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}