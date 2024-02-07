import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagementApi";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();
  const { data: sData } = useGetAllSemestersQuery([{ name: "sort", value: "year" }]);

  const academicSemesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);

    try {
      const res = (await addRegisteredSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Semester Created", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect name="academicSemesterId" label="Academic Semester" options={academicSemesterOptions} />
          <UMSelect name="status" label="Status" options={semesterStatusOptions} />
          <UMDatePicker name="startDate" label="Start Date" />
          <UMDatePicker name="endDate" label="End Date" />
          <UMInput type="text" name="minCredit" label="Min Credit" />
          <UMInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default SemesterRegistration;
