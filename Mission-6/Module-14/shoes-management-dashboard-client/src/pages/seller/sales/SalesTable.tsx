import { Skeleton, Table, TableProps } from "antd";
import { useGetSalesHistoryQuery } from "../../../redux/features/sale/saleApi";
import { TSale } from "../../../types";

type TSalesPeriodProps = {
  salesPeriod: string;
};

const SalesTable = ({ salesPeriod }: TSalesPeriodProps) => {
  const { data: salesData, isLoading, isFetching } = useGetSalesHistoryQuery(salesPeriod);

  const tableData = salesData?.data?.map(
    ({ _id, productId, quantitySold, buyerName, saleDate, createdAt, updatedAt }: TSale) => ({
      key: _id,
      productId,
      productName: productId?.name,
      productQuantity: productId?.quantity,
      productPrice: productId?.price,
      quantitySold,
      buyerName,
      saleDate,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableProps<TSale>["columns"] = [
    {
      title: "Buyer Name",
      key: "buyerName",
      dataIndex: "buyerName",
      align: "center",
    },
    {
      title: "Quantity Sold",
      key: "quantitySold",
      dataIndex: "quantitySold",
      align: "center",
    },
    {
      title: "Sale Date",
      key: "saleDate",
      dataIndex: "saleDate",
      align: "center",
    },
    {
      title: "Product Name",
      key: "productName",
      dataIndex: "productName",
      align: "center",
    },
    {
      title: "Product Quantity",
      key: "productQuantity",
      dataIndex: "productQuantity",
      align: "center",
    },
    {
      title: "Product Price",
      key: "productPrice",
      dataIndex: "productPrice",
      align: "center",
    },
  ];

  if (isLoading) return <Skeleton active />;

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      loading={isFetching}
      pagination={false}
      scroll={{ x: true }}
      bordered
    />
  );
};

export default SalesTable;
