import { Button, Pagination, Space, Spin, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllAdminQuery } from "../../../redux/features/admin/userManagementApi";
import { TStudent } from "../../../types";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">;

const AdminData = () => {
  const [page, setPage] = useState(1);
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetAllAdminQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
  ]);

  const metaData = adminData?.meta;

  const tableData = adminData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
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
      title: "Admin ID",
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
            <Link to={`/admin/admin-data/${item.key}`}>
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
export default AdminData;
