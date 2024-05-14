import HFileUploader from "@/components/Forms/HFileUploader";
import HForm from "@/components/Forms/HForm";
import HInput from "@/components/Forms/HInput";
import HModal from "@/components/Shared/HModal/HModal";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// type
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: TProps) => {
  const [createSpecialty] = useCreateSpecialtyMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      const res = await createSpecialty(data).unwrap();
      if (res?.id) {
        toast.success("Specialty Created Successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      toast.success(error?.message);
    }
  };

  return (
    <HModal open={open} setOpen={setOpen} title="Create A New Specialty">
      <HForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <HInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <HFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </HForm>
    </HModal>
  );
};

export default SpecialtyModal;
