import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <div className="flex h-full items-center justify-center">{children}</div>
    </ClerkProvider>
  );
};

export default AuthLayout;
