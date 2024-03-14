"use client";

import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryItemProps {
  key: String;
  value?: String;
  icon?: IconType;
  label: String;
}
export const CategoryItem = ({
  key,
  value,
  icon: Icon,
  label,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // getting the currentId and the title from the url parameter after pushing to determinethe isSelected state.
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  // the selection state is based on if currentCategoryId is equal to the value (item.id) => item is the category
  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <button
      className={cn(
        "flex items-center gap-x-1 rounded-full border border-slate-200 px-3 py-2 text-sm transition hover:border-sky-700",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800",
      )}
      onClick={onClick}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
