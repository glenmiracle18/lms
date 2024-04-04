"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
const SideBarItem = ({ icon: Icon, label, href }: SideBarItemProps) => {
  // dynamic pathnames
  const pathname = usePathname();
  const router = useRouter();

  // active class
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  // click handler
  const handleClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600",
        isActive &&
          "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "tesxt-slate-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-sky-700 opacity-0 transition-all",
          isActive && "opacity-100",
        )}
      ></div>
    </button>
  );
};

export default SideBarItem;
