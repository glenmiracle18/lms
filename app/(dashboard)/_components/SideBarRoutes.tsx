"use client"
import React from 'react'
import SideBarItem from './SideBarItem';
import { Layout, Compass, Medal, Users, Flame } from 'lucide-react';

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

const SideBarRoutes = () => {
    const routes = guestRoutes;
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