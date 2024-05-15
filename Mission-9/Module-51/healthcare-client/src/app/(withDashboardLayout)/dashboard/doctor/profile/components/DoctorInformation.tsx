"use client";
import { Box, Stack, Typography, styled } from "@mui/material";

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const DoctorInformation = ({ data }: any) => {
  return (
    <>
      {/* basic information */}
      <Typography variant="h5" color="primary.main">
        Basic Information
      </Typography>
      <Stack
        direction={{
          sx: "column",
          md: "row",
        }}
        gap={2}
        flexWrap="wrap">
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Gender
          </Typography>
          <Typography>{data?.gender}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Designation
          </Typography>
          <Typography>{data?.designation}</Typography>
        </StyledInformationBox>
      </Stack>

      {/* basic information */}
      <Typography variant="h5" color="primary.main">
        Professional Information
      </Typography>
      <Stack
        direction={{
          sx: "column",
          md: "row",
        }}
        gap={2}
        flexWrap="wrap">
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Appointment Fee
          </Typography>
          <Typography>{data?.appointmentFee}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Qualification
          </Typography>
          <Typography>{data?.qualification}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Current Working Place
          </Typography>
          <Typography>{data?.currentWorkingPlace}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Status
          </Typography>
          <Typography>{data?.status}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Average Rating
          </Typography>
          <Typography>{data?.averageRating}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Experience
          </Typography>
          <Typography>{data?.experience}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default DoctorInformation;
