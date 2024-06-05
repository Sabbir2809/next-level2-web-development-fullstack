"use client";
import { useGetMyScheduleQuery } from "@/redux/api/doctorScheduleApi";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DoctorAppointmentsSchedules = () => {
  const { data, isLoading } = useGetMyScheduleQuery({});
  // console.log(data.data);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "isBooked", headerName: "Booked", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 5 }}>My Appointment Schedules</Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={[]} columns={columns} hideFooter={true} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress disableShrink />;
        </Box>
      )}
    </Box>
  );
};

export default DoctorAppointmentsSchedules;
