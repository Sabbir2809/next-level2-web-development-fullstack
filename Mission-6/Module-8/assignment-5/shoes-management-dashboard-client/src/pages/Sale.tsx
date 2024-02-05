import { Typography } from "antd";
import SaleHistory from "../components/sale/SaleHistory";

const Sale = () => {
  return (
    <div>
      <Typography.Title level={3} style={{ color: "#1677FF" }}>
        Sales Management
      </Typography.Title>
      <SaleHistory />
    </div>
  );
};
export default Sale;
