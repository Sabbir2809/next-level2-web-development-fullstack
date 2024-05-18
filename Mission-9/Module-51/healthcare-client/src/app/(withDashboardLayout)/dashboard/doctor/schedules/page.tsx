"use client";
import {
  useDeleteDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
} from "@/redux/api/doctorScheduleApi";
import dateFormatter from "@/utils/dateFormatter";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, CircularProgress, IconButton, Pagination, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DoctorScheduleModal from "./components/DoctorScheduleModal";

const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query: Record<string, any> = {};
  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading } = useGetAllDoctorSchedulesQuery({ ...query });
  const schedules = data?.doctorSchedules;
  const meta = data?.meta;

  let pageCount: number;
  if (meta?.total) {
    pageCount = Math.ceil(meta?.total / limit);
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = schedules?.map((schedule: any, index: number) => ({
      id: schedule?.scheduleId,
      startDate: dateFormatter(schedule?.schedule?.startDate),
      startTime: dayjs(schedule?.startDate).format("hh:mm a"),
      endTime: dayjs(schedule?.endDate).format("hh:mm a"),
    }));
    setAllSchedule(updateData);
  }, [schedules]);

  const [deleteSchedule] = useDeleteDoctorScheduleMutation();
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
          <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)} endIcon={<AddIcon />} sx={{ mt: 2, mb: 2 }}>
        Create Doctor Schedule
      </Button>
      <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Typography variant="h5">All Doctor Schedules</Typography>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={allSchedule ?? []}
            columns={columns}
            hideFooterPagination
            slots={{
              footer: () => (
                <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                  />
                </Box>
              ),
            }}
          />
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
