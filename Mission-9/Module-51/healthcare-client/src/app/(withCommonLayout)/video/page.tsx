import VideoCalling from "@/components/UI/VideoCall/VideoCalling";

const VideoCallingPage = ({ searchParams }: { searchParams: { videoCallingId: string } }) => {
  const { videoCallingId } = searchParams;

  return <VideoCalling videoCallingId={videoCallingId} />;
};

export default VideoCallingPage;
