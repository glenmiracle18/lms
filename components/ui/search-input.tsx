import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useParams } from "next/navigation";

export const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  userEffect{() => {
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
  }, [debounceValue, currentCategoryId, router, pathname, params]}

  return (
    <>
      <div className="relative items-center">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
        <Input
          className="forcus-visible:ring-slate-200 w-full rounded-full bg-slate-100 pl-9 md:w-[300px]"
          placeholder="Search for a course"
        />
      </div>
    </>
  );
};
