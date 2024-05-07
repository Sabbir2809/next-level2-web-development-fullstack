import logo from "@/assets/svgs/logo.svg";
import { getUserInfo } from "@/services/auth.services";
import { UserRole } from "@/types";
import drawerMenuItem from "@/utils/drawerMenuItem";
import { Box, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
        sx={{
          paddingY: 1,
          marginTop: 1,
        }}>
        <Image src={logo} alt="logo" width={40} height={40} />
        <Typography variant="h6" component="h1">
          Healthcare
        </Typography>
      </Stack>
      {/* Drawer Menu Items */}
      <List>
        {drawerMenuItem(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
