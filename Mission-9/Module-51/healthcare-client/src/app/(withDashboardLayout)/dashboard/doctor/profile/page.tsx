"use client";
import HAutoFileUploader from "@/components/Forms/HAutoFileUploader";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/api/userApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { useState } from "react";
import DoctorInformation from "./components/DoctorInformation";
import ProfileUpdateModal from "./components/ProfileUpdateModal";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetUserProfileQuery(undefined);

  const [updateUserProfile, { isLoading: isUploading }] = useUpdateUserProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    updateUserProfile(formData);
  };

  return (
    <>
      <ProfileUpdateModal open={open} setOpen={setOpen} id={data?.id}></ProfileUpdateModal>
      <Container
        sx={{
          mt: 4,
        }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress disableShrink />;
          </Box>
        ) : (
          <Grid2 container spacing={4}>
            <Grid2 xs={12} md={4}>
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: 1,
                }}>
                <Image src={data?.profilePhoto} alt="profile avatar" width={400} height={300} />
              </Box>
              <Box my={1}>
                {isUploading ? (
                  <CircularProgress disableShrink />
                ) : (
                  <HAutoFileUploader
                    name="file"
                    label="Choose"
                    icon={<CloudUploadIcon />}
                    onFileUpload={fileUploadHandler}
                    variant="text"
                    sx={{
                      width: "100%",
                    }}
                  />
                )}
              </Box>
              <Button fullWidth endIcon={<ModeEditIcon />} onClick={() => setOpen(true)}>
                Edit My Profile
              </Button>
            </Grid2>

            <Grid2 xs={12} md={8}>
              <DoctorInformation data={data} />
            </Grid2>
          </Grid2>
        )}
      </Container>
    </>
  );
};

export default ProfilePage;
