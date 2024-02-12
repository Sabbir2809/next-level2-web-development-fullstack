import { Button, Col, Flex } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import UMSelectWithWatch from "../../../components/form/UMSelectWithWatch";
import UMTimePicker from "../../../components/form/UMTimePicker";
import { weekDaysOptions } from "../../../constants/global";
import {
  useGetAcademicDepartmentsQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagementApi";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } = useGetAcademicDepartmentsQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } = useGetCourseFacultiesQuery(courseId, {
    skip: !courseId,
  });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemesterId.name} ${item.academicSemesterId.year}`,
  }));

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const courseOptions = coursesData?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item: any) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            name="semesterRegistrationId"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <UMSelect name="academicFaculty" label="Academic Faculty" options={academicFacultyOptions} />
          <UMSelect
            name="academicDepartmentId"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <UMSelectWithWatch
            name="courseId"
            label="Course"
            options={courseOptions}
            onValueChange={setCourseId}
          />
          <UMSelect
            name="facultyId"
            label="Faculty"
            options={facultiesOptions}
            disabled={!courseId || fetchingFaculties}
          />
          <UMInput type="text" name="section" label="Section" />
          <UMInput type="text" name="maxCapacity" label="Max Capacity" />
          <UMSelect mode="multiple" options={weekDaysOptions} name="days" label="Days" />
          <UMTimePicker name="startTime" label="Start Time" />
          <UMTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};
export default OfferCourse;
