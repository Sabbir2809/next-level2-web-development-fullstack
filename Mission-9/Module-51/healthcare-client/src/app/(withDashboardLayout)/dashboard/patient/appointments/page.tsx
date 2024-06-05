"use client";
import { useGetMyAppointmentsQuery } from "@/redux/api/appointmentApi";
import dateFormatter from "@/utils/dateFormatter";
import getTimeIn12HourFormat from "@/utils/getTimeIn12HourFormat";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Box, Chip, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const PatientAppointmentsPage = () => {
  const { data, isLoading } = useGetMyAppointmentsQuery({});
  const appointments = data?.appointments;
  const meta = data?.meta;

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.name;
      },
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      flex: 1,
      renderCell: ({ row }) => {
        return row?.patient?.contactNumber;
      },
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return dateFormatter(row.schedule.startDate);
      },
    },
    {
      field: "appointmentTime",
      headerName: "Appointment Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return getTimeIn12HourFormat(row?.schedule?.startDate);
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row.paymentStatus === "PAID" ? (
          <Chip label={row.paymentStatus} color="success" />
        ) : (
          <Chip label={row.paymentStatus} color="warning" />
        );
      },
    },
    {
      field: "action",
      headerName: "Join",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Link href={`/video?videoCallingId=${row?.videoCallingId}`}>
            <IconButton disabled={row.paymentStatus === "UNPAID"}>
              <VideocamIcon
                sx={{
                  color: row.paymentStatus === "PAID" ? "primary.main" : "",
                }}
              />
            </IconButton>
          </Link>
        );
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={appointments ?? []} columns={columns} loading={isLoading} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default PatientAppointmentsPage;
