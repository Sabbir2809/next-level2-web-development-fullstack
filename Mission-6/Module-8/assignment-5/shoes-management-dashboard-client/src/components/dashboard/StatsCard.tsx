import { Card, Space, Statistic } from "antd";

const StatsCard = ({ title, value, icon }: any) => {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};
export default StatsCard;
