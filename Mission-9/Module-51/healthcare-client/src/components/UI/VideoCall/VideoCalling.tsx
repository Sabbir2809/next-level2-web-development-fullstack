"use client";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { Button, Stack } from "@mui/material";
import AgoraUIKit from "agora-react-uikit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VideoCalling = ({ videoCallingId }: { videoCallingId: string }) => {
  const router = useRouter();
  const [startVideoCall, setStartVideoCall] = useState(false);

  const rtcProps = {
    appId: `${process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID}`,
    channel: videoCallingId, // your agora channel
    token: null, // use null or skip if using app in testing mode
  };

  const callbacks = {
    EndCall: () => {
      setStartVideoCall(false);
      router.push("/dashboard");
    },
  };

  return startVideoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{
        width: "100%",
        minWidth: 500,
        mx: "auto",
      }}>
      <Button
        onClick={() => setStartVideoCall(true)}
        endIcon={<VideoCallIcon />}
        sx={{ borderRadius: "20px" }}>
        Start Video Call
      </Button>
      <Image
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
        width={500}
        height={500}
        alt="video call gif"
      />
    </Stack>
  );
};

export default VideoCalling;
