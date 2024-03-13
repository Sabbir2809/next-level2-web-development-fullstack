import { Button, Col, Input, Modal, Pagination, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import SMForm from "../../../components/form/SMForm";
import SMSelect from "../../../components/form/SMSelect";
import { colorsArray, sizesArray, stylesArray } from "../../../constants/global";
import {
  useDeleteMultipleProductsMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types";
import { TQueryParam } from "../../../types/global.type";
import CreateSell from "../sales/CreateSell";
import UpdateShoes from "./UpdateShoes";

const ProductTable = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: products, isFetching } = useGetProductsQuery([
    { name: "page", value: page },
    { name: "searchTerm", value: search },
    ...params,
  ]);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteMultipleProducts] = useDeleteMultipleProductsMutation();

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

  const productOptions = products?.data?.map((item: TProduct) => ({
    value: item._id,
    label: `name: ${item.name} || price: ${item.price} || quantity: ${item.quantity}`,
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
      title: "Action",
      key: "action",
      align: "center",
      render: (item: TProduct) => {
        return (
          <>
            {/* create sell */}
            <CreateSell sellInfo={item} />
            {/* update product */}
            <UpdateShoes shoesInfo={item} />
            {/* create product variant */}
            <Link
              to={{
                pathname: `/seller/create-variant`,
              }}
              state={{ shoesInfo: item }}>
              <Button>Create Variant</Button>
            </Link>
            {/* delete product */}
            <Button
              size="small"
              danger
              onClick={() => handleDeleteShoes(item.key)}
              style={{ width: "100%", marginTop: "4px" }}>
              Delete
            </Button>
          </>
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

  // handle delete action
  const handleDeleteShoes = (id: string) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteProduct(id);
      },
    });
  };

  const handleSubmit = (data: FieldValues) => {
    Modal.confirm({
      title: "Are you sure, you want to delete multiple products in record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await deleteMultipleProducts(data);
      },
    });
  };

  return (
    <>
      <Typography.Title level={2}>Shoes Management</Typography.Title>
      {/* Searching */}
      <Col span={24}>
        <Input.Search
          placeholder="Search here"
          style={{ marginBottom: 8 }}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
        />
      </Col>

      {/* Bulk Delete */}
      <SMForm onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
          }}>
          <div className="w-screen">
            <SMSelect
              mode="multiple"
              name="productIds"
              label=""
              placeholder="select and delete multiple shoe"
              options={productOptions}
            />
          </div>
          <Button htmlType="submit" size="large" danger>
            Bulk Delete
          </Button>
        </div>
      </SMForm>

      {/* Table and Pagination */}
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

export default ProductTable;
