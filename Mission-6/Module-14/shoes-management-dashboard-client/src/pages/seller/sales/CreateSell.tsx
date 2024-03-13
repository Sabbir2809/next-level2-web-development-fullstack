import { Button, Modal } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SMDatePicker from "../../../components/form/SMDatePicker";
import SMForm from "../../../components/form/SMForm";
import SMInput from "../../../components/form/SMInput";
import { useCreateSaleMutation } from "../../../redux/features/sale/saleApi";
import { TProduct } from "../../../types";
import { TResponse } from "../../../types/global.type";

const CreateSell = ({ sellInfo }: { sellInfo: TProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [createSale] = useCreateSaleMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: FieldValues) => {
    const sellData = {
      productId: sellInfo.key,
      quantitySold: Number(data.quantity),
      buyerName: data.buyerName,
      saleDate: moment(new Date(data.date)).format("YYYY-MM-DD"),
    };
    const res = (await createSale(sellData)) as TResponse<any>;
    if (res.data.success) {
      toast.success("Shoes Sell Successfully");
      navigate("/seller/sales-history");
    } else {
      toast.error("BuyerName QuantitySold and Date is Required");
    }
  };

  return (
    <>
      <Button onClick={showModal} style={{ width: "100%" }}>
        Sell
      </Button>

      <Modal
        title={`${sellInfo.name}: available Quantity (${sellInfo.quantity})`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <SMForm onSubmit={handleSubmit}>
          <SMInput type="text" name="buyerName" label="Buyer Name" />
          <SMInput type="text" name="quantity" label="Quantity" />
          <SMDatePicker name="date" label="Date" />
          <Button htmlType="submit">Sell</Button>
        </SMForm>
      </Modal>
    </>
  );
};

export default CreateSell;
