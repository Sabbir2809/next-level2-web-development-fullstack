import { Button, Spin, Table, TableProps, type TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">;

const columns: TableColumnsType<TTableData> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
    align: "center",
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Fall",
        value: "Fall",
      },
      {
        text: "Summer",
        value: "Summer",
      },
    ],
  },
  {
    key: "year",
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
    ],
  },
  {
    key: "startMonth",
    title: "Start Month",
    dataIndex: "startMonth",
    align: "center",
  },
  {
    key: "endMonth",
    title: "End Month",
    dataIndex: "endMonth",
    align: "center",
  },
  {
    title: "Action",
    key: "",
    align: "center",
    render: () => {
      return (
        <div>
          <Button>Update </Button>
        </div>
      );
    },
  },
];

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
    key: _id,
    name,
    year,
    startMonth,
    endMonth,
  }));

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      // name
      filters?.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
      setParams(queryParams);

      // year
      filters?.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
      setParams(queryParams);
    }
  };

  if (isLoading) {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }

  return <Table columns={columns} dataSource={tableData} onChange={onChange} loading={isFetching} />;
};
export default AcademicSemester;
