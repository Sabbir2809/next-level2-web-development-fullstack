import { Button, Input, Pagination, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { colorsArray, sizesArray, stylesArray } from "../../constants/global";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types";
import { TQueryParam } from "../../types/global.type";

const Product = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: products, isFetching } = useGetProductsQuery([
    { name: "page", value: page },
    { name: "searchTerm", value: search },
    ...params,
  ]);

  const metaData = products?.meta;
  const tableData = products?.data?.map(
    ({
      _id,
      productID,
      name,
      price,
      quantity,
      brand,
      color,
      size,
      model,
      style,
      material,
      releaseDate,
    }: TProduct) => ({
      key: _id,
      productID,
      name,
      price,
      quantity,
      brand,
      color,
      size,
      model,
      style,
      material,
      releaseDate,
    })
  );

  function uniqueArray(array: []) {
    return Array.from(new Set(array));
  }
  const arrayWithDuplicates = products?.data?.map(({ price }: { price: number }) => price);
  const uniqueArrayResult = uniqueArray(arrayWithDuplicates);

  const priceArray = uniqueArrayResult?.map((price) => ({
    text: price,
    value: price,
  }));

  const columns: TableProps<TProduct>["columns"] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      align: "center",
      filters: priceArray,
      filterSearch: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      align: "center",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
      align: "center",
      filters: colorsArray,
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
      align: "center",
      filters: sizesArray,
    },
    {
      title: "Style",
      key: "style",
      dataIndex: "style",
      align: "center",
      filters: stylesArray,
    },
    {
      title: "Model",
      key: "model",
      dataIndex: "model",
      align: "center",
    },
    {
      title: "Action",
      key: "x",
      align: "center",
      render: (item: TProduct) => {
        return (
          <div>
            <Link to={`/buyer/verify/${item.productID}`}>
              <Button style={{ width: "100%" }}>Verify Product</Button>
            </Link>
          </div>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TProduct>["onChange"] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters?.color?.forEach((item) => queryParams.push({ name: "color", value: item }));
      setParams(queryParams);

      filters?.size?.forEach((item) => queryParams.push({ name: "size", value: item }));
      setParams(queryParams);

      filters?.style?.forEach((item) => queryParams.push({ name: "style", value: item }));
      setParams(queryParams);

      filters?.price?.forEach((item) => queryParams.push({ name: "price", value: item }));
      setParams(queryParams);
    }
  };

  return (
    <>
      <Typography.Title level={2}>Shoes Management</Typography.Title>
      <Input.Search
        placeholder="Search here"
        style={{ marginBottom: 8 }}
        onChange={(e) => setSearch(e.target.value)}
        size="large"
      />
      <Table
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        loading={isFetching}
        pagination={false}
        scroll={{ x: true }}
        bordered
      />
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
        style={{ marginTop: "10px", textAlign: "right" }}
      />
    </>
  );
};

export default Product;
