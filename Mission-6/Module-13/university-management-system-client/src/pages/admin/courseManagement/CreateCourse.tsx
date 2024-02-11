import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();

  const preRequisiteCoursesOption = courses?.data?.map((course: any) => ({
    value: course._id,
    label: `${course.title}`,
  }));

  console.log(preRequisiteCoursesOption);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses
        ? data?.preRequisiteCourses?.map((item: any) => ({
            courseId: item,
            isDeleted: false,
          }))
        : [],
      isDeleted: false,
    };

    try {
      const res = (await addCourse(courseData)) as TResponse<any>;
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
          <UMInput type="text" name="title" label="Title" />
          <UMInput type="text" name="code" label="Code" />
          <UMInput type="text" name="prefix" label="Prefix" />
          <UMInput type="text" name="credits" label="Credit" />
          <UMSelect
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
            options={preRequisiteCoursesOption}
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default CreateCourse;
