"use client";
import { useDeleteScheduleMutation, useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import { TSchedule } from "@/types/schedule";
import dateFormatter from "@/utils/dateFormatter";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ScheduleModal from "./components/ScheduleModal";

const SchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);

  const { data, isLoading } = useGetAllSchedulesQuery({});
  const schedules = data?.schedules;
  const meta = data?.meta;

  const [deleteSchedule] = useDeleteScheduleMutation();

  useEffect(() => {
    const updateData = schedules?.map((schedule: TSchedule) => ({
      id: schedule?.id,
      startDate: dateFormatter(schedule.startDate),
      endDate: dateFormatter(schedule.endDate),
      startTime: dayjs(schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.endDate).format("hh:mm a"),
    }));
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success("Deleted Successfully!");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
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
          <Box justifyContent="center">
            <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton aria-label="delete">
              <EditIcon sx={{}} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>Create Schedules</Button>
      <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Box my={5}>Display Schedule</Box>
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

export default SchedulesPage;
