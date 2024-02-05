import { Col, Row, Skeleton, Typography } from "antd";
import { GiConverseShoe } from "react-icons/gi";
import { TbCoinTakaFilled } from "react-icons/tb";
import StatsCard from "../components/dashboard/StatsCard";
import { useGetDashboardStatisticsQuery } from "../redux/features/product/productApi";

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatisticsQuery(undefined);

  if (isLoading) return <Skeleton avatar paragraph={{ rows: 4 }} />;

  return (
    <div>
      <Typography.Title level={3} style={{ color: "#1677FF" }}>
        Dashboard Stats
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <StatsCard
            icon={<GiConverseShoe size={40} />}
            title={"Total Quantity Sale"}
            value={data?.data?.totalSales}
          />
        </Col>
        <Col xs={24} lg={12}>
          <StatsCard
            icon={<TbCoinTakaFilled size={40} color="" />}
            title={"Total Revenue"}
            value={data?.data?.totalRevenue}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
