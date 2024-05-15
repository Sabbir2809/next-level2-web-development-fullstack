import getTimeIn12HourFormat from "@/utils/getTimeIn12HourFormat";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectFieldChip = ({
  schedules,
  selectedScheduleIds,
  setSelectedScheduleIds,
}: any) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof selectedScheduleIds>) => {
    const {
      target: { value },
    } = event;
    setSelectedScheduleIds(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel>Doctor Schedule</InputLabel>
        <Select
          multiple
          value={selectedScheduleIds}
          onChange={handleChange}
          input={<OutlinedInput label="Doctor Schedule" />}
          renderValue={(selected) => {
            return (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value: any) => {
                  const selectedSchedule = schedules.find((schedule: any) => schedule.id === value);

                  if (!selectedSchedule) return null;

                  const formattedTimeSlot = `${getTimeIn12HourFormat(
                    selectedSchedule.startDate
                  )} - ${getTimeIn12HourFormat(selectedSchedule.endDate)}`;

                  return <Chip key={value} label={formattedTimeSlot} />;
                })}
              </Box>
            );
          }}
          MenuProps={MenuProps}>
          {schedules.map((schedule: any) => (
            <MenuItem
              key={schedule.id}
              value={schedule.id}
              style={getStyles(schedule.id, selectedScheduleIds, theme)}>
              {`${getTimeIn12HourFormat(schedule.startDate)} - ${getTimeIn12HourFormat(
                schedule.endDate
              )}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectFieldChip;
