/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Skeleton, Table, TableProps } from "antd";
import {
  setIsActiveModal,
  setIsEditActiveModal,
  setIsSaleActiveModal,
} from "../../redux/features/modal/modalSlice";
import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/features/product/productApi";
import { setSearchProduct, setUpdatedProduct } from "../../redux/features/product/productSlice";
import { setSaleProduct } from "../../redux/features/sale/saleSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TProduct } from "../../types";
import SaleProduct from "../sale/SaleProduct";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

const ProductList = () => {
  // Redux Store
  const dispatch = useAppDispatch();
  const { isEditModalOpen } = useAppSelector((state) => state.modal);
  const { isSaleModalOpen } = useAppSelector((state) => state.modal);
  const { updatedProduct, searchProduct } = useAppSelector((state) => state.Product);
  const { saleProduct } = useAppSelector((state) => state.sale);

  // RTK Query
  const { data, isLoading } = useGetProductsQuery([]);
  const [deleteProduct] = useDeleteProductMutation();
  const products: TProduct[] | [] = data?.data?.result;

  const id = Math.random().toString(36).substring(2);

  const columns: TableProps<any>["columns"] = [
    {
      key: "name",
      title: "Product Name",
      dataIndex: "name",
      align: "center",
      filteredValue: [searchProduct],
      // @ts-ignore
      onFilter: (value: string, record: TProduct) => {
        return (
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.brand.toLowerCase().includes(value.toLowerCase()) ||
          record.model.toLowerCase().includes(value.toLowerCase()) ||
          record.color.toLowerCase().includes(value.toLowerCase()) ||
          record.size.toLowerCase().includes(value.toLowerCase()) ||
          record.releaseDate.toLowerCase().includes(value.toLowerCase()) ||
          record.price.toString().includes(value)
        );
      },
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      align: "center",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input.Search
            placeholder="Search by price"
            style={{ width: 200, marginBottom: 8 }}
            onChange={(e) => dispatch(setSearchProduct(e.target.value))}
          />
        </div>
      ),
      filterIcon: () => <SearchOutlined />,
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
    },
    {
      key: "brand",
      title: "Brand",
      dataIndex: "brand",
      align: "center",
    },
    {
      key: "color",
      title: "Color",
      dataIndex: "color",
      align: "center",
    },
    {
      key: "size",
      title: "Size",
      dataIndex: "size",
      align: "center",
    },
    {
      key: "model",
      title: "Model",
      dataIndex: "model",
      align: "center",
    },
    {
      key: "style",
      title: "Style",
      dataIndex: "style",
      align: "center",
    },
    {
      key: "releaseDate",
      title: "Release Date",
      dataIndex: "releaseDate",
      align: "center",
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      render: (record: TProduct) => {
        return (
          <>
            <EditOutlined
              onClick={() => handleUpdateProduct(record)}
              style={{ color: "orange", fontSize: 20 }}
            />
            <DeleteOutlined
              onClick={() => handleDeleteProduct(record)}
              style={{ color: "red", marginLeft: 12, fontSize: 20 }}
            />
            <Button
              type="link"
              onClick={() => {
                handleSaleProduct(record);
              }}>
              Sell
            </Button>
          </>
        );
      },
    },
  ];

  // handle delete action
  const handleDeleteProduct = (record: TProduct) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteProduct(record._id);
      },
    });
  };

  // handle update action
  const handleUpdateProduct = (record: TProduct) => {
    dispatch(setIsEditActiveModal(true));
    dispatch(setUpdatedProduct({ ...record }));
  };

  // handle sale
  const handleSaleProduct = (record: TProduct) => {
    dispatch(setIsSaleActiveModal(true));
    dispatch(setSaleProduct({ ...record }));
  };

  // table data source
  const dataSource = products?.map((product, index) => ({ ...product, key: index.toString() }));

  if (isLoading) return <Skeleton active />;

  return (
    <>
      {/* Create Product page */}
      <Row>
        <Col span={12}>
          {/* Create Product */}
          <CreateProduct />
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              dispatch(setIsActiveModal(true));
            }}>
            Add Product
          </button>
        </Col>
        <Col span={12}>
          {/* Search */}
          <Input.Search
            placeholder="Search here"
            style={{ marginBottom: 8 }}
            onChange={(e) => dispatch(setSearchProduct(e.target.value))}
            size="large" // Set the size to large
          />
        </Col>
      </Row>

      {/* Update Product */}
      <Modal
        title="Update Product"
        open={isEditModalOpen}
        onCancel={() => {
          dispatch(setIsEditActiveModal(false));
          dispatch(setUpdatedProduct(null));
        }}>
        <UpdateProduct key={id} updatedProduct={updatedProduct} />
      </Modal>

      {/* Sale Product */}
      <Modal
        title="Sale Product"
        open={isSaleModalOpen}
        onCancel={() => {
          dispatch(setIsSaleActiveModal(false));
        }}>
        <SaleProduct key={id} saleProduct={saleProduct} />
      </Modal>

      <div style={{ overflowX: "auto" }}>
        <Table columns={columns} dataSource={dataSource} bordered />
      </div>
    </>
  );
};

export default ProductList;
