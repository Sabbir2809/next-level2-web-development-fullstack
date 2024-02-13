import { Button, Table, type TableColumnsType } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicSemester } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicSemester, "name">;

const AcademicFaculty = () => {
  const { data: academicFacultyData, isFetching } = useGetAcademicFacultiesQuery(undefined);

  const tableData = academicFacultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
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

  return <Table columns={columns} dataSource={tableData} loading={isFetching} />;
};
export default AcademicFaculty;
