import React from 'react'
import Sidebar from './_components/Sidebar';

const DashBoardLayout = ({
    children
}:{
    children: React.ReactNode;
}) => {
    return (
        <div className='h-full'>
            <div className='hidden md:flex flex-col h-full w-56 fixed inset-y-0 z-50'>
                <Sidebar />
            </div>
            {children}
        </div>
    )
}

export default DashBoardLayout