import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0">
        <SheetClose asChild>
          <Sidebar />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
