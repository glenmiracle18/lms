import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 block h-[80px] w-full md:hidden md:pl-80">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="fixed inset-y-0 hidden h-full w-80 flex-col  md:flex">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="h-full pt-[80px] md:pl-80">{children}</main>
    </div>
  );
};

export default CourseLayout;
