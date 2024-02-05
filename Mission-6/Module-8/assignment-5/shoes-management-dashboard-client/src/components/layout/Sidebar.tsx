import { DashboardOutlined, HistoryOutlined, PoweroffOutlined, ShopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    toast.success("Logout Successful");
    dispatch(logout());
  };

  const items = [
    {
      key: "Dashboard",
      label: <NavLink to="/">Dashboard</NavLink>,
      icon: <DashboardOutlined />,
    },
    {
      key: "Shoes Management",
      label: <NavLink to="/products-list">Shoes Management</NavLink>,
      icon: <ShopOutlined />,
    },
    {
      key: "Sales History",
      label: <NavLink to="/sales-history">Sales History</NavLink>,
      icon: <HistoryOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <PoweroffOutlined />,
      danger: true,
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}>
      <div
        style={{
          color: "#1677FF",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}>
        Shoes Inventory
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{ color: "white" }}
        defaultSelectedKeys={["Dashboard"]}
        items={items}
        onClick={({ key }) => {
          if (key === "logout") {
            handleLogout();
          }
        }}
      />
    </Sider>
  );
};
export default Sidebar;
