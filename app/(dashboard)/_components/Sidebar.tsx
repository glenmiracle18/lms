import React from "react";
import { Logo } from "./logo";
import SideBarRoutes from "./SideBarRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="flex items-center gap-2 p-6">
        <Logo />
        <h1 className="text-xl font-bold text-emerald-600">UNITECH</h1>
      </div>
      <div className="flex w-full flex-col">
        <SideBarRoutes />
      </div>
      {/* pro card */}
      <div className="m-2 mt-auto">
        <Card>
          <CardHeader>
            <CardTitle className="mb-2 text-emerald-500">
              Upgrade to Pro
            </CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full" variant="success">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
