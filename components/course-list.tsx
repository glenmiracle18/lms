"use client";
import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

// combining the cousrse with the progress and the category
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-muted-foreground mt-10 text-center text-sm">
          No courses found
        </div>
      )}
    </div>
  );
};
