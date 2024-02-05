import { Tabs } from "antd";
import SaleList from "./SaleList";

const SaleHistory = () => {
  const items = [
    {
      key: "daily",
      label: "Daily",
      children: <SaleList salesPeriod="daily" />,
    },
    {
      key: "weekly",
      label: "Weekly",
      children: <SaleList salesPeriod="weekly" />,
    },

    {
      key: "monthly",
      label: "Monthly",
      children: <SaleList salesPeriod="monthly" />,
    },
    {
      key: "yearly",
      label: "Yearly",
      children: <SaleList salesPeriod="yearly" />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="daily" items={items} />
    </>
  );
};
export default SaleHistory;
