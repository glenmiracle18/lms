import React from 'react'

const CourseIdPage = ({
    params
}: {
    params: {courseId: string}
}) => {
    
    return (
        <div>CourseId: {params.courseId}</div>
    )
    }

export default CourseIdPage