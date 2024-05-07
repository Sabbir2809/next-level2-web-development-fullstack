import MenuDrawer from "@/components/Dashboard/Drawer/MenuDrawer";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MenuDrawer>{children}</MenuDrawer>
    </div>
  );
};

export default DashboardLayout;
