import { Badge, Card, Col, Drawer, Table, TableProps, Typography } from "antd";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import Stepper from "../../components/ui/Stepper";
import { useGetMeQuery } from "../../redux/features/auth/authApi";
import { TPolish } from "../../types";

const BuyerDashboard = () => {
  const [open, setOpen] = useState(false);
  const { data, isFetching } = useGetMeQuery(undefined);
  const buyerData = data?.data;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const tableData = data?.data?.polishServices.map(({ polishId }: { polishId: TPolish }) => ({
    key: polishId._id,
    polishType: polishId.polishType,
    shineLevel: polishId.shineLevel,
    polishColor: polishId.polishColor,
    numberOfPairs: polishId.numberOfPairs,
    instructions: polishId.instructions,
    createdAt: polishId.createdAt,
    updatedAt: polishId.updatedAt,
    status:
      polishId.status === "Pending" ? (
        <Stepper index={0} />
      ) : polishId.status === "In-Progress" ? (
        <Stepper index={1} />
      ) : (
        <Stepper index={2} />
      ),
    acceptedBySeller: polishId.acceptedBySeller,
  }));

  const columns: TableProps<TPolish>["columns"] = [
    {
      title: "Polish Type",
      key: "polishType",
      dataIndex: "polishType",
      align: "center",
    },
    {
      title: "Shine Level",
      key: "shineLevel",
      dataIndex: "shineLevel",
      align: "center",
    },
    {
      title: "Polish Color",
      key: "polishColor",
      dataIndex: "polishColor",
      align: "center",
    },
    {
      title: "Pairs Shoes",
      key: "numberOfPairs",
      dataIndex: "numberOfPairs",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 bg-white rounded-full"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
          />
        </div>
        <div className="h-56 mx-4 w-5/6 bg-blue-400 rounded-3xl shadow-md sm:w-80 sm:mx-0">
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
            <h2 className="text-white text-xl font-semibold">Profile</h2>
            <Badge count={data?.data?.carts?.length} color="green">
              <FaCartPlus color="white" size={24} onClick={showDrawer} className="hover:cursor-pointer" />
            </Badge>
            <Drawer title="My Cart" onClose={onClose} open={open}>
              {data?.data?.carts?.map((item: any) => (
                <Col span={24}>
                  <Card title={item?.productId?.name} bordered={false} style={{ marginBottom: "10px" }}>
                    <li>Color: {item?.productColor}</li>
                    <li>Size: {item?.productSize}</li>
                    <li>Quantity: {item?.productQuantity}</li>
                  </Card>
                </Col>
              ))}
            </Drawer>
          </div>
          <div className="bg-white h-28 w-full rounded-3xl flex flex-col justify-around items-center">
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
              <h2 className="text-gray-700 font-bold text-xl mt-10">{buyerData?.name}</h2>
              <h2 className="text-gray-500 text-sm">Email: {buyerData?.email}</h2>
            </div>
          </div>
        </div>
      </div>
      <Typography.Title level={3}>Polish Status</Typography.Title>
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isFetching}
          pagination={false}
          scroll={{ x: true }}
          bordered
        />
      </div>
    </div>
  );
};

export default BuyerDashboard;
