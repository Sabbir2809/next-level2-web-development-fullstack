import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import SMForm from "../../../components/form/SMForm";
import SMInput from "../../../components/form/SMInput";
import { useUpdateProductMutation } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types";

const UpdateShoes = ({ shoesInfo }: { shoesInfo: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateProduct] = useUpdateProductMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const sellData = {
      productId: shoesInfo.key,
      data: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
    };
    const res = await updateProduct(sellData);
    if (res) {
      toast.success("Shoes Information Updated Successfully");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="dashed"
        style={{ width: "100%", marginBottom: "4px", marginTop: "4px" }}>
        Update
      </Button>
      <Modal
        title={`${shoesInfo.name}: available Quantity (${shoesInfo.quantity})`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <Row>
          <Col span={24}>
            <SMForm onSubmit={onSubmit} defaultValues={shoesInfo}>
              <Row gutter={8}>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="name" label="Product Name" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="price" label="Price" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="quantity" label="Quantity" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="size" label="Size" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="color" label="Color" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="style" label="Style" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="brand" label="Brand" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="model" label="Model" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="material" label="Material" />
                </Col>
                <Col span={24} md={12} lg={12}>
                  <SMInput type="text" name="releaseDate" label="Release Date" />
                </Col>
              </Row>
              <Button htmlType="submit" style={{ marginRight: "5px" }}>
                Update
              </Button>
            </SMForm>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UpdateShoes;
