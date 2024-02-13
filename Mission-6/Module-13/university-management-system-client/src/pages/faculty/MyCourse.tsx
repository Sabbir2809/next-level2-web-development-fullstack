import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UMForm from "../../components/form/UMForm";
import UMSelect from "../../components/form/UMSelect";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourseManagementApi";

const MyCourse = () => {
  const navigate = useNavigate();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);

  const semesterOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: `${item.academicSemesterId.name} ${item.academicSemesterId.year}`,
    value: item.semesterRegistrationId._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item: any) => ({
    label: item.courseId.title,
    value: item.courseId._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    navigate(`/faculty/courses/${data.semesterRegistrationId}/${data.courseId}`);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect name="semesterRegistrationId" label="Semester" options={semesterOptions} />
          <UMSelect name="courseId" label="Course" options={courseOptions} />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default MyCourse;
