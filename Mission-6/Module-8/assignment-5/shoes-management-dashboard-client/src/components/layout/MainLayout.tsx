import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ height: "100%" }}>
      {/* sidebar component */}
      <Sidebar></Sidebar>
      <Layout>
        {/* content */}
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            {/* outlet */}
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
