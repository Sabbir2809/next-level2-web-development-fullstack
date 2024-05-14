"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";

const DoctorSchedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <Box sx={{ mb: 5 }}></Box>
      <Box>
        <Box my={2}>
          <DataGrid rows={[]} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorSchedulesPage;
