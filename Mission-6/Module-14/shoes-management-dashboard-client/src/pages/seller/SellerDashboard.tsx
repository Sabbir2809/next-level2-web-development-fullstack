import { Skeleton } from "antd";
import StatsCard from "../../components/ui/StatsCard";
import { useGetDashboardStatisticsQuery } from "../../redux/features/product/productApi";

const SellerDashboard = () => {
  const { data, isLoading } = useGetDashboardStatisticsQuery(undefined);

  if (isLoading) return <Skeleton avatar paragraph={{ rows: 6 }} />;

  return <StatsCard statsData={data?.data} />;
};

export default SellerDashboard;
