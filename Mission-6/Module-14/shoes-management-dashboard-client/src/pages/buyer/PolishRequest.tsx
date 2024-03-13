import { Button, Col, Flex, Typography } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SMForm from "../../components/form/SMForm";
import SMInput from "../../components/form/SMInput";
import SMSelect from "../../components/form/SMSelect";
import { polishTypeOptions, shineLevelOptions, shoeColorOptions } from "../../constants/global";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreatePolishRequestMutation } from "../../redux/features/polish/polishApi";
import { useAppSelector } from "../../redux/hooks";
import { TResponse } from "../../types/global.type";

const PolishRequest = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const [createPolishRequest] = useCreatePolishRequestMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const polishData = {
      userId: user?.userId,
      ...data,
    };
    try {
      const res = (await createPolishRequest(polishData)) as TResponse<any>;
      if (res?.data?.success) {
        toast.success("Polish Request Successfully");
        navigate("/buyer/dashboard");
      } else {
        toast.error("Polish Information is Required");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Typography.Title level={3}>Create Polish Request</Typography.Title>
      <Flex justify="center" align="center">
        <Col span={24} lg={12}>
          <SMForm onSubmit={onSubmit}>
            <SMSelect name="polishType" label="Polish Type" options={polishTypeOptions} />
            <SMSelect name="shineLevel" label="Shine Level" options={shineLevelOptions} />
            <SMSelect name="polishColor" label="Polish Color" options={shoeColorOptions} />
            <SMInput type="text" name="numberOfPairs" label="Number of Pairs" />
            <SMInput type="textarea" name="instructions" label="Instructions" />
            <Button htmlType="submit">Polish Request</Button>
          </SMForm>
        </Col>
      </Flex>
    </>
  );
};
export default PolishRequest;
