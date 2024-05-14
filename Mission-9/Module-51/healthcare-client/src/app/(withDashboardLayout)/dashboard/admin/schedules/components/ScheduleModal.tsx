import HDatePicker from "@/components/Forms/HDatePicker";
import HForm from "@/components/Forms/HForm";
import HTimePicker from "@/components/Forms/HTimePicker";
import HModal from "@/components/Shared/HModal/HModal";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import dateFormatter from "@/utils/dateFormatter";
import timeFormatter from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    try {
      const res = await createSchedule(values).unwrap();
      if (res?.length) {
        toast.success("Schedule Created Successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <HModal open={open} setOpen={setOpen} title="Create Schedule">
      <HForm onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid item md={6}>
            <HDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={6}>
            <HDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <HTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <HTimePicker name="endTime" label="Start Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 2 }}>
          Create
        </Button>
      </HForm>
    </HModal>
  );
};

export default ScheduleModal;
