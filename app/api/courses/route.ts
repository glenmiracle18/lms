import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
) {
    try {
        // getting the user id from the request cookies. 
        // If there is no cookie or if it's expired, then we redirect to login
        const { userId } = auth()
        const { title } = await req.json()

        // checking for authentication using clerk
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // creating a new course
        const course = await db.course.create({
            data: {
                userId,
                title
            }
        });

        // returning the course
        return NextResponse.json(course)

    } catch (error) {
        console.log("[COURSES", error)
    }
}