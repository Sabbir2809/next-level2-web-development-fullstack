import { Skeleton, Table, TableProps } from "antd";
import { useGetSalesHistoryQuery } from "../../redux/features/sale/saleApi";

type TSalesPeriodProps = {
  salesPeriod: string;
};

const SaleList = ({ salesPeriod }: TSalesPeriodProps) => {
  const { data: salesData, isLoading } = useGetSalesHistoryQuery(salesPeriod);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      align: "center",
    },
    {
      title: "Quantity Sold",
      dataIndex: "quantitySold",
      align: "center",
    },
    {
      title: "Sale Date",
      dataIndex: "saleDate",
      align: "center",
    },
    {
      title: "Product Details",
      dataIndex: "productId",
      align: "center",
      render: (productId) => (
        <>
          <p className="text-blue-500 ">Name: {productId?.name}</p>
          <p className="text-blue-500 ">Price: {productId?.price}</p>
          <p className="text-blue-500 ">Quantity: {productId?.quantity}</p>
        </>
      ),
    },
  ];

  if (isLoading) return <Skeleton active />;

  return (
    <Table
      columns={columns}
      dataSource={salesData?.data}
      rowKey={(record) => record._id}
      bordered
      pagination={{ pageSize: 6 }}
    />
  );
};

export default SaleList;
