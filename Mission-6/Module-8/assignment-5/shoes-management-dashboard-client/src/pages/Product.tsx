import { Typography } from "antd";
import ProductList from "../components/product/ProductList";

const Product = () => {
  return (
    <>
      <Typography.Title level={3} style={{ color: "#1677FF" }}>
        Shoes Management
      </Typography.Title>
      <ProductList />
    </>
  );
};
export default Product;
