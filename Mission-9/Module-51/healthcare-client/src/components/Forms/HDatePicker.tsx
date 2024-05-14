import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type TDatePicker = {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
};

const HDatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
}: TDatePicker) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            {...field}
            onChange={(date) => onChange(date)}
            label={label}
            value={value || Date.now()}
            timezone="system"
            disablePast
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx,
                },
                variant: "outlined",
                fullWidth: fullWidth,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default HDatePicker;
