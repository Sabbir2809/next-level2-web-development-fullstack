import { Button, Dropdown, MenuProps, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import Stepper from "../../components/ui/Stepper";
import {
  useGetAllPolishRequestQuery,
  useUpdatePolishRequestStatusMutation,
} from "../../redux/features/polish/polishApi";
import { TPolish } from "../../types";
import { TResponse } from "../../types/global.type";

const PolishService = () => {
  const [polishId, setPolishId] = useState("");

  const { data: polishData, isFetching } = useGetAllPolishRequestQuery(undefined);
  const [updatePolishRequestStatus] = useUpdatePolishRequestStatusMutation();

  const tableData = polishData?.data?.map(
    ({ _id, polishType, shineLevel, polishColor, numberOfPairs, status, userId }: TPolish) => ({
      key: _id,
      name: userId.name,
      email: userId.email,
      polishType,
      shineLevel,
      polishColor,
      numberOfPairs,
      status:
        status === "Pending" ? (
          <Stepper index={0} />
        ) : status === "In-Progress" ? (
          <Stepper index={1} />
        ) : (
          <Stepper index={2} />
        ),
    })
  );

  const handleStatusUpdate: MenuProps["onClick"] = async (data) => {
    const updateDate = {
      polishId,
      data: {
        status: data.key,
        acceptedBySeller: true,
      },
    };
    const res = (await updatePolishRequestStatus(updateDate)) as TResponse<any>;
    if (res.data.success) {
      toast.success("Status Change Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const items: MenuProps["items"] = [
    { key: "Pending", label: "Pending" },
    { key: "In-Progress", label: "In-Progress" },
    { key: "Completed", label: "Completed" },
  ];

  const menuProps = { items, onClick: handleStatusUpdate };

  const columns: TableProps<TPolish>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Polish Type",
      dataIndex: "polishType",
      align: "center",
    },
    {
      title: "Shine Level",
      dataIndex: "shineLevel",
      align: "center",
    },
    {
      title: "Polish Color",
      dataIndex: "polishColor",
      align: "center",
    },
    {
      title: "Pairs Shoes",
      dataIndex: "numberOfPairs",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      render: (item: TPolish) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setPolishId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>Polish Service</Typography.Title>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isFetching}
        pagination={false}
        scroll={{ x: true }}
        bordered
      />
    </div>
  );
};
export default PolishService;
