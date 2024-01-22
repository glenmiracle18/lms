import React from 'react'
import { Logo } from './logo'
import SideBarRoutes from './SideBarRoutes'

const Sidebar = () => {
    return (
        <div className='h-full border-r shadow-sm bg-white flex flex-col overflow-y-auto'>
            <div className='p-6'>
                <Logo />
            </div>
            <div className='flex flex-col w-full'>
                <SideBarRoutes />
            </div>
        </div>
    )
}

export default Sidebar