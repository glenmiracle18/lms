import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchInput = () => {
  // sends the input value to the debounce
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  // useEffect for creating a new url
  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
    // the function will only run/rerun, if the values in the dependency array changes
  }, [currentCategoryId, pathname, debounceValue, router]);

  return (
    <>
      <div className="relative items-center">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="forcus-visible:ring-slate-200 w-full rounded-full bg-slate-100 pl-9 md:w-[300px]"
          placeholder="Search for a course"
        />
      </div>
    </>
  );
};
