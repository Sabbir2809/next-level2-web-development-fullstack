"use client";
import { useGetAllDoctorsQuery, useSoftDeleteDoctorMutation } from "@/redux/api/doctorApi";
import { useDebounced } from "@/redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DoctorModal from "./components/DoctorModal";

const DoctorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 800,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorsQuery({ ...query });
  const doctors = data?.doctors;
  const meta = data?.meta;

  const [softDeleteDoctor] = useSoftDeleteDoctorMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await softDeleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success("Doctor Deleted Successfully");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      // const res = await softDeleteDoctor(id).unwrap();
      // if (res?.id) {
      //   toast.success("Doctor Deleted Successfully");
      // }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "appointmentFee", headerName: "Appointment Free", flex: 1 },
    { field: "qualification", headerName: "Qualification", flex: 1 },
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
            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="edit" onClick={() => handleUpdate(row.id)}>
                <EditIcon sx={{}} />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Create Specialty</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Specialist"
          size="small"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={doctors} columns={columns} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress disableShrink />;
        </Box>
      )}
    </Box>
  );
};

export default DoctorsPage;
