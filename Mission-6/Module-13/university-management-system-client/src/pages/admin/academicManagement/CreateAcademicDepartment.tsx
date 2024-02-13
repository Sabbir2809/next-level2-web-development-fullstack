import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment, TResponse } from "../../../types";

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = academicFacultyData?.data?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const academicDepartmentData = {
      name: data.name,
      academicFacultyId: data.academicFacultyId,
    };

    try {
      const res = (await addAcademicDepartment(academicDepartmentData)) as TResponse<TAcademicDepartment[]>;
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
          <UMInput type="text" name="name" label="Department Name" />
          <UMSelect name="academicFacultyId" label="Academic Faculty" options={academicFacultyOptions} />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default CreateAcademicDepartment;
