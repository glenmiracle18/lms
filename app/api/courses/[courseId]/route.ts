import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

// utility for creating http response
import { NextResponse  } from "next/server";

// PATCH method
export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } } // destructuring the params object
    ){
        
    try {
        const { userId } = auth();
        const { courseId } = params;
        const values = await req.json();

        // check if user is authenticated
        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // check if courseId is present
        if(!courseId){
            return new NextResponse("Course ID is required", { status: 400 });
        }

        // update the course
        const course = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values,
            },
        })
        
        // return the updated course
        return  NextResponse.json(course)


    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}