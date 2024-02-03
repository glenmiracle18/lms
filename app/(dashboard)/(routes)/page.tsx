import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <div className='p-6'>
            <Link  href='/teacher/create'>
                <Button>
                    Create Course
                </Button>
            </Link>
        </div>
    )
}

export default Dashboard