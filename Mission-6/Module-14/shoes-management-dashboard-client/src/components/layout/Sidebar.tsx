/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import { useEffect, useState } from "react";
import { TUser, logout, selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { buyerPaths } from "../../routes/buyer.routes";
import { sellerPaths } from "../../routes/seller.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  BUYER: "buyer",
  SELLER: "seller",
};

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState<ItemType<MenuItemType>[]>([]);
  const token = useAppSelector(selectCurrentToken);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    let user;
    if (token) {
      user = verifyToken(token);
      let generatedSidebarItems: ItemType<MenuItemType>[] = [];

      switch ((user as TUser).role) {
        case userRole.SELLER:
          //@ts-ignore
          generatedSidebarItems = sidebarItemsGenerator(sellerPaths, userRole.SELLER);
          break;
        case userRole.BUYER:
          //@ts-ignore
          generatedSidebarItems = sidebarItemsGenerator(buyerPaths, userRole.BUYER);
          break;
        default:
          break;
      }
      setSidebarItems(generatedSidebarItems);
    }
  }, [token]);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}>
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography.Title level={4} style={{ color: "white" }}>
          Shoes Inventory
        </Typography.Title>
      </div>

      {/* Menu Items */}
      <Menu theme="dark" mode="inline" items={sidebarItems} />

      {/* Logout Functionality */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="dashed"
          size="small"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginTop: "15px" }}>
          Logout
        </Button>
      </div>
    </Sider>
  );
};
export default Sidebar;
