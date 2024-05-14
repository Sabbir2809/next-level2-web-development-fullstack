"use client";

import HForm from "@/components/Forms/HForm";
import HInput from "@/components/Forms/HInput";
import { useGetDoctorQuery, useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const id = params?.doctorId;
  const { data, isLoading } = useGetDoctorQuery(id);
  const [updateDoctor] = useUpdateDoctorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = id;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully");
        router.push(`/dashboard/admin/doctors`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Information
      </Typography>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress disableShrink />;
        </Box>
      ) : (
        <HForm onSubmit={handleFormSubmit} defaultValues={data}>
          <Grid container spacing={2} sx={{ my: 5 }}>
            {/* name */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput name="name" label="Name" fullWidth={true} sx={{ mb: 2 }} />
            </Grid>
            {/* email */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput name="email" type="email" label="Email" fullWidth={true} sx={{ mb: 2 }} />
            </Grid>
            {/* contactNumber */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Address */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput name="address" label="Address" fullWidth={true} sx={{ mb: 2 }} />
            </Grid>
            {/* Registration Number */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Experience  */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Appointment Fee */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput
                name="appointmentFee"
                type="number"
                label="AppointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Qualification */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput name="qualification" label="Qualification" fullWidth={true} sx={{ mb: 2 }} />
            </Grid>
            {/* Current Working Place */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            {/* Designation */}
            <Grid item xs={12} sm={12} md={4}>
              <HInput name="designation" label="Designation" fullWidth={true} sx={{ mb: 2 }} />
            </Grid>
          </Grid>
          <Button type="submit">Update</Button>
        </HForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
