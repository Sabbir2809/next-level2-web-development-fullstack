import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import UMForm from "../../components/form/UMForm";
import UMInput from "../../components/form/UMInput";
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourseManagementApi";

const MyStudent = () => {
  const { semesterRegistration, course } = useParams();

  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistrationId", value: semesterRegistration },
    { name: "courseId", value: course },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, studentId, semesterRegistrationId, offeredCourseId }) => ({
      key: _id,
      name: studentId.fullName,
      roll: studentId.id,
      studentId: studentId._id,
      semesterRegistrationId: semesterRegistrationId._id,
      offeredCourseId: offeredCourseId._id,
    })
  );

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      key: "roll",
      title: "Roll",
      dataIndex: "roll",
      align: "center",
    },
    {
      title: "Action",
      key: "",
      align: "center",
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

const AddMarksModal = ({ studentInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addMark] = useAddMarkMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: any) => {
    const studentData = {
      semesterRegistrationId: studentInfo.semesterRegistrationId,
      offeredCourseId: studentInfo.offeredCourseId,
      studentId: studentInfo.studentId,
      courseMarks: {
        classTest1: Number(data.classTest1),
        classTest2: Number(data.classTest2),
        midTerm: Number(data.midTerm),
        finalTerm: Number(data.finalTerm),
      },
    };
    const res = await addMark(studentData);
    console.log(res);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal title="Add Faculty" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <UMForm onSubmit={handleSubmit}>
          <UMInput type="text" name="classTest1" label="Class Test 1" />
          <UMInput type="text" name="classTest2" label="Class Test 2" />
          <UMInput type="text" name="midTerm" label="Mid-Term" />
          <UMInput type="text" name="finalTerm" label="Final-Term" />
          <Button htmlType="submit">Add</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default MyStudent;
