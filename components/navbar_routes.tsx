"use client";
import { UserButton } from "@clerk/clerk-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();

  // verification for teacher (course) mode
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="ml-auto flex gap-2">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="outline">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
