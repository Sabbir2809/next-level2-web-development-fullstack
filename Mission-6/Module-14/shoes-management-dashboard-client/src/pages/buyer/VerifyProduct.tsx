import { Button, Col, Input, QRCode, Row, Skeleton, Space, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import SMForm from "../../components/form/SMForm";
import SMInput from "../../components/form/SMInput";
import SMSelect from "../../components/form/SMSelect";
import { shoeColorOptions, shoeSizesOptions } from "../../constants/global";
import { useAddToCartMutation, useVerifyProductQuery } from "../../redux/features/product/productApi";
import { TResponse } from "../../types/global.type";

const VerifyProduct = () => {
  const navigate = useNavigate();
  const { productID } = useParams();

  const { data, isLoading } = useVerifyProductQuery(productID);
  const verifyData = data?.data;

  const [addToCart] = useAddToCartMutation();

  if (isLoading) {
    return <Skeleton avatar paragraph={{ rows: 8 }} />;
  }

  const onSubmit = async (data: FieldValues) => {
    const cartData = {
      productColor: data.color,
      productSize: data.size,
      productQuantity: data.quantity,
      productId: verifyData._id,
    };
    try {
      const res = (await addToCart(cartData)) as TResponse<any>;
      if (res.data.success === true) {
        toast.success("Add To Cart Successfully");
        navigate("/buyer/products");
      }
    } catch (error) {
      toast.error("Please Select Color, Size, Quantity");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2}>Product Details</Typography.Title>
      <Row gutter={[16, 16]} justify="center" align="top">
        <Col span={24} lg={12}>
          <div style={{ padding: "20px", border: "1px solid #e8e8e9", borderRadius: "5px" }}>
            <Typography.Title level={2}>{verifyData?.name}</Typography.Title>
            <div style={{ marginBottom: "20px" }}>
              <div>
                <p className="text-lg">Price: {verifyData?.price} TK</p>
                <p className="text-lg">Stock: {verifyData?.quantity}</p>
                <p className="text-lg">Brand: {verifyData?.brand}</p>
                <p className="text-lg">Modal: {verifyData?.model}</p>
                <p className="text-lg">Color: {verifyData?.color}</p>
                <p className="text-lg">Size: {verifyData?.size}</p>
                <p className="text-lg">Style: {verifyData?.style}</p>
              </div>
            </div>
            <Row>
              <Col span={24}>
                <SMForm onSubmit={onSubmit}>
                  <Row gutter={8}>
                    <Col span={24} md={12} lg={8}>
                      <SMSelect name="size" label="Your Size" options={shoeSizesOptions} />
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <SMSelect name="color" label="Your Color" options={shoeColorOptions} />
                    </Col>
                    <Col span={24} md={12} lg={8}>
                      <SMInput type="text" name="quantity" label="Quantity" />
                    </Col>
                  </Row>
                  <Button htmlType="submit" block size="large">
                    Add to Cart
                  </Button>
                </SMForm>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24} lg={12}>
          <div style={{ textAlign: "center" }}>
            <Space direction="vertical" align="center">
              <QRCode value={productID || "-"} />
              <Input placeholder="-" maxLength={60} value={productID} />
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default VerifyProduct;
