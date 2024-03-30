import { NavbarRoutes } from "@/components/navbar_routes";

import MobileSidebar from "./MobileSidebar";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
