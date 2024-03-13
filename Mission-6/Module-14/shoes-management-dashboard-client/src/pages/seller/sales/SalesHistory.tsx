import { Tabs, Typography } from "antd";
import SalesTable from "./SalesTable";

const SalesHistory = () => {
  const items = [
    {
      key: "daily",
      label: "Daily",
      children: <SalesTable salesPeriod="daily" />,
    },
    {
      key: "weekly",
      label: "Weekly",
      children: <SalesTable salesPeriod="weekly" />,
    },

    {
      key: "monthly",
      label: "Monthly",
      children: <SalesTable salesPeriod="monthly" />,
    },
    {
      key: "yearly",
      label: "Yearly",
      children: <SalesTable salesPeriod="yearly" />,
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>Sales Management</Typography.Title>
      <Tabs defaultActiveKey="daily" items={items} />
    </div>
  );
};
export default SalesHistory;
