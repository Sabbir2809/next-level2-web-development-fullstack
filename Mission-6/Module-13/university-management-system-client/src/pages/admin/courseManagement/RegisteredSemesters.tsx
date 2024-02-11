import { Button, Dropdown, MenuProps, Table, Tag, type TableColumnsType } from "antd";
import moment from "moment";
import { useState } from "react";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagementApi";
import { TSemesterRegistration } from "../../../types";

type TTableData = Pick<TSemesterRegistration, "status" | "startDate" | "endDate">;

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: registeredSemesterData, isFetching } = useGetAllRegisteredSemestersQuery(undefined);
  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();

  const tableData = registeredSemesterData?.data?.map(
    ({ _id, academicSemesterId, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemesterId.name} ${academicSemesterId.year} `,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusUpdate: MenuProps["onClick"] = (data) => {
    const updateDate = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateRegisteredSemester(updateDate);
  };

  const items: MenuProps["items"] = [
    { key: "UPCOMING", label: "Upcoming" },
    { key: "ONGOING", label: "Ongoing" },
    { key: "ENDED", label: "Ended" },
  ];
  const menuProps = { items, onClick: handleStatusUpdate };

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
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
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
      key: "action",
      align: "center",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={tableData} loading={isFetching} />
    </>
  );
};
export default RegisteredSemesters;
