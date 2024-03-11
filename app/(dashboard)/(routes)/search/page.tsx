import { db } from "@/lib/db";
import React from "react";
import { Categories } from "./_components/categories";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SearchPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-4 p-6">
      <Categories items={categories} />
    </div>
  );
};

export default SearchPage;
