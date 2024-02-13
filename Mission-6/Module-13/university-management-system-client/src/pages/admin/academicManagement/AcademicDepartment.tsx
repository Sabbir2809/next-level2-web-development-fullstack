import { Button, Table, type TableColumnsType } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicDepartment, "name">;

const AcademicDepartment = () => {
  const { data: academicDepartmentData, isFetching } = useGetAcademicDepartmentsQuery(undefined);

  const tableData = academicDepartmentData?.data?.map(({ _id, name, academicFacultyId }) => ({
    key: _id,
    name,
    academicFacultyId: academicFacultyId.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      key: "academicFacultyId",
      title: "Academic Faculty",
      dataIndex: "academicFacultyId",
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
export default AcademicDepartment;
