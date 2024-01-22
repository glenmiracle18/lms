import React from 'react'
import MobileSideBar from './MobileSidebar'
import NavbarRoutes from '@/components/navbar_routes'


const Navbar = () => {
    return (
        <div className='flex items-center border-b shadow-sm p-4 h-full bg-white'>
            <MobileSideBar />
            <NavbarRoutes />
        </div>
    )
}

export default Navbar