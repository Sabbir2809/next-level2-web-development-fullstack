import { Button, Pagination, Space, Spin, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagementApi";
import { TStudent } from "../../../types";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;

const StudentData = () => {
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
    key: _id,
    fullName,
    id,
    email,
    contactNo,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Student ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              {" "}
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

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
export default StudentData;
