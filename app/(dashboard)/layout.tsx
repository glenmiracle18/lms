import React from 'react'
import Sidebar from './_components/Sidebar';
import Navbar from './_components/Navbar';

const DashBoardLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return (
        <div className='h-full'>
            <div className='md:pl-56 h-[80px] inset-y-0 z-50 w-full'>
                <Navbar />
            </div>
            <div className='hidden md:flex flex-col h-full w-56 fixed inset-y-0 z-50'>
                <Sidebar />
            </div>
            <main className='md:pl-56 h-full'>
                {children}
            </main>
        </div>
    )
}

export default DashBoardLayout