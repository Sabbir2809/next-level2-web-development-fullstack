import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicFaculty, TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await addAcademicFaculty(data)) as TResponse<TAcademicFaculty[]>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic Faculty Created", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMInput type="text" name="name" label="Faculty Name" />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default CreateAcademicFaculty;
