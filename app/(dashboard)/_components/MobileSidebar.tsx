import React from 'react'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetTrigger,
    SheetContent
} from '@/components/ui/sheet'
import Sidebar from './Sidebar';

const MobileSideBar = () => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden pr-4 transition hover:opacity-75'>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className='p-0 bg-white'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSideBar