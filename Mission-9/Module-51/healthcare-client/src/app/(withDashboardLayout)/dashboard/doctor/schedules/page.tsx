"use client";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import dateFormatter from "@/utils/dateFormatter";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";

const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);

  const { data, isLoading } = useGetAllDoctorSchedulesQuery({});
  const schedules = data?.doctorSchedules;

  // const [deleteSchedule] = useDeleteScheduleMutation();

  useEffect(() => {
    const updateData = schedules?.map((schedule: any, index: number) => ({
      sl: index + 1,
      id: schedule?.doctorId,
      startDate: dateFormatter(schedule?.schedule?.startDate),
      startTime: dayjs(schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.endDate).format("hh:mm a"),
    }));
    setAllSchedule(updateData);
  }, [schedules]);

  // const handleDelete = async (id: string) => {
  //   try {
  //     const res = await deleteSchedule(id).unwrap();
  //     if (res?.id) {
  //       toast.success("Deleted Successfully!");
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.message);
  //   }
  // };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton aria-label="delete">
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Doctor Schedule</Button>
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Box sx={{ mb: 5 }}>All Doctor Schedules</Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedule ?? []} columns={columns} hideFooter={true} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress disableShrink />;
        </Box>
      )}
    </Box>
  );
};

export default DoctorSchedulesPage;
