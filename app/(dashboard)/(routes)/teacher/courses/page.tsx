import React from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
