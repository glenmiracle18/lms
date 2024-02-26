import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId } = auth()
        const { title } = await req.json()

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

        // fetching the laterst chapter created
        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: "desc"
            }
        })


        // creating the chapter
        const chapter = await db.chapter.create({
            data: {
                title,
                position: 0,
                courseId: params.courseId
            }
        })

        // returning the attachments
        return NextResponse.json(chapter)

    } catch (error) {
        console.log("COURSE_ID_CHAPTER: ", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}