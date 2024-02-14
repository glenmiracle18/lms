import React from 'react'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { LayoutDashboard } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {

    const { userId } = auth()

    // redirect the user to the root page if they are not authenticated
    if(!userId){
        redirect("/")
    }

    // fetch the course from the database
    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    // redirect the root page if the course is not found
    if (!course) {
        redirect("/")
    }

    // array of required fields
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId
    ]

    // calculate the number of fields left to complete
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields}) fields completed`;

    return (
        <div className='p-6'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='font-medium text-2xl'>
                        Course Setup
                    </h1>
                    <span className='text-sm text-slate-700'>
                        Complete all fields {completionText} before going live!
                    </span>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className='text-xl'>
                            Customize your course
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default CourseIdPage