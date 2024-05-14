import HForm from "@/components/Forms/HForm";
import HInput from "@/components/Forms/HInput";
import HSelectField from "@/components/Forms/HSelectField";
import HFullScreenModal from "@/components/Shared/HModal/HFullScreenModal";
import { GENDER } from "@/constants/common";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor] = useCreateDoctorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    const data = modifyPayload(values);

    try {
      const res = await createDoctor(data).unwrap();
      if (res?.id) {
        toast.success("Doctor Created Successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <HFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <HForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          {/* name */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput name="doctor.name" label="Name" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>
          {/* email */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* password */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* contactNumber */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Address */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput name="doctor.address" label="Address" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>
          {/* Registration Number */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Experience  */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Gender */}
          <Grid item xs={12} sm={12} md={4}>
            <HSelectField items={GENDER} name="doctor.gender" label="Gender" sx={{ mb: 2 }} />
          </Grid>
          {/* Appointment Fee */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.appointmentFee"
              type="number"
              label="AppointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Qualification */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Current Working Place */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          {/* Designation */}
          <Grid item xs={12} sm={12} md={4}>
            <HInput name="doctor.designation" label="Designation" fullWidth={true} sx={{ mb: 2 }} />
          </Grid>
        </Grid>
        <Button type="submit">Create</Button>
      </HForm>
    </HFullScreenModal>
  );
};

export default DoctorModal;
