import { Button, Spin, Table, type TableColumnsType } from "antd";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagementApi";
import { TSemesterRegistration } from "../../../types";

type TTableData = Pick<TSemesterRegistration, "status" | "startDate" | "endDate">;

const columns: TableColumnsType<TTableData> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    align: "center",
  },
  {
    key: "status",
    title: "Status",
    dataIndex: "status",
  },
  {
    key: "startDate",
    title: "Start Date",
    dataIndex: "startDate",
    align: "center",
  },
  {
    key: "endDate",
    title: "End Date",
    dataIndex: "endDate",
    align: "center",
  },
  {
    title: "Action",
    key: "",
    align: "center",
    render: () => {
      return (
        <div>
          <Button>Update</Button>
        </div>
      );
    },
  },
];

const RegisteredSemesters = () => {
  const {
    data: registeredSemesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemesterId, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemesterId.name} ${academicSemesterId.year} `,
      status,
      startDate,
      endDate,
    })
  );

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

  return (
    <div>
      <Table columns={columns} dataSource={tableData} loading={isFetching} />
    </div>
  );
};
export default RegisteredSemesters;
