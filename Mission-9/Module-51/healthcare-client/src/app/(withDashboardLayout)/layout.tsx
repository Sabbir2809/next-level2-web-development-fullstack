"use client";
import MenuDrawer from "@/components/Dashboard/Drawer/MenuDrawer";
import { isLoggedIn } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  if (!isLoggedIn()) {
    return router.push("/login");
  }
  return <MenuDrawer>{children}</MenuDrawer>;
};

export default DashboardLayout;
