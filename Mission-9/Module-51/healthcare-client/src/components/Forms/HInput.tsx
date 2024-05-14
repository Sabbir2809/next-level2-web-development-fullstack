import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

// type
type TInputProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
};

const HInput = ({
  name,
  type = "text",
  label,
  required,
  size = "small",
  fullWidth,
  sx,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          placeholder={label}
          required={required}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          error={!!error?.message}
          sx={{ ...sx }}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default HInput;
