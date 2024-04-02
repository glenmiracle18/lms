import { Chapter, Course, UserProgress } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar_routes";

import CourseMobileSideBar from "./course-mobile-sdiebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null; // Make userProgress optional
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <CourseMobileSideBar progressCount={progressCount} course={course} />
      <NavbarRoutes />
    </div>
  );
};
