import { useGetVideosByUserIdQuery } from "../app/createVideosApi";
import { Videos } from "./Videos";
import { useParams } from "react-router-dom";
const userId = "anel_danza";

export const VideosSideBar = () => {
  const { videoId } = useParams();
  const { data, error, isLoading, isError, isSuccess, isFetching } =
    useGetVideosByUserIdQuery(userId);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    const otherVideos = data.videos.filter((video) => video.id !== videoId);
    content = <Videos videos={otherVideos} style="grid grid-cols-1 gap-4" />;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <main
      className={`${
        "opacity-50" && isFetching
      } flex-col max-h-screen sticky top-0 h-screen overflow-y-auto`}
    >
      {content}
    </main>
  );
};
