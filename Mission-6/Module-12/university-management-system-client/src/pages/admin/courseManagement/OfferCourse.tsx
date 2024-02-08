import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelectWithWatch from "../../../components/form/UMSelectWithWatch";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";

const OfferCourse = () => {
  const [id, setId] = useState("");
  const { data: academicFaculty } = useGetAcademicFacultiesQuery([{ name: "sort", value: "year" }]);

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelectWithWatch
            name="academicSemesterId"
            label="Academic Semester"
            options={academicFacultyOptions}
            onValueChange={setId}
          />
          <UMInput type="text" name="maxCredit" label="Max Credit" disabled={!id} />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default OfferCourse;
