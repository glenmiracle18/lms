import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Course, Chapter, UserProgress } from "@prisma/client";
import { CourseSidebar } from "./course-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progressCount: number;
}

const CourseMobileSideBar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 transition hover:opacity-75 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-white p-0">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSideBar;
