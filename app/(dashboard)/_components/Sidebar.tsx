import React from "react";
import { Logo } from "./logo";
import SideBarRoutes from "./SideBarRoutes";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="flex items-center gap-2 p-6">
        <Logo />
        <h1 className="text-xl font-bold text-blue-500">UNITECH</h1>
      </div>
      <div className="flex w-full flex-col">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
