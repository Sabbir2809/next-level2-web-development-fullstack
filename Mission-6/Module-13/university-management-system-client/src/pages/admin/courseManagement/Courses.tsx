import { Button, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagementApi";

const Courses = () => {
  const [page, setPage] = useState(1);
  const { data: courses, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const metaData = courses?.meta;

  const tableData = courses?.data?.map(({ _id, title, prefix, code }: any) => ({
    key: _id,
    title,
    code: `${prefix}-${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
      width: "1%",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData} loading={isFetching} pagination={false} />
      <Pagination
        onChange={(value) => setPage(value)}
        current={page}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addFaculties] = useAddFacultiesMutation();
  const { data: facultiesData } = useGetAllFacultyQuery(undefined);

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };
    addFaculties(facultyData);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal title="Add Faculty" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <UMForm onSubmit={handleSubmit}>
          <UMSelect mode="multiple" name="faculties" label="faculties" options={facultiesOptions} />
          <Button htmlType="submit">Add</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default Courses;
