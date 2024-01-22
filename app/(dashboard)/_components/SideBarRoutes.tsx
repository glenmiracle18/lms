"use client"
import React from 'react'
import SideBarItem from './SideBarItem';
import { Layout, Compass, Medal, Users, Flame, BarChartBig, MonitorPlay } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

// the student/guest route params
const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
    {
        icon: Medal,
        label: "Leaderboard",
        href: "/leaderboard",
    },
    {
        icon: Users,
        label: "Communities",
        href: "/communities"
    },
    {
        icon: Flame,
        label: "Mentorship",
        href: "/mentorship",
    }
]

// teacher/tutor route params
const teacherRoute = [
    {
        icon: MonitorPlay,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChartBig,
        label: "Analytics",
        href: "/teacher/analytics",
    },
]

const SideBarRoutes = () => {

    const pathname = usePathname()
    const router = useRouter();

    // checking for teacher state
    const isTeacherPage = pathname.includes('/teacher');

    const routes = isTeacherPage ? teacherRoute : guestRoutes;

    return (
        <div className='flex flex-col w-full'>
            {
                routes.map((route) => (
                    <SideBarItem 
                        key={route.href}
                        label={route.label}
                        href={route.href}
                        icon={route.icon}
                    />
                ))
            }

        </div>
    )
}

export default SideBarRoutes