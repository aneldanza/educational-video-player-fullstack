import { useSearchParams } from "react-router-dom";
import { useGetVideosByUserIdQuery } from "../../app/createVideosApi";
import { Spinner } from "../Spinner";
import { Videos } from "../layout-components/Videos";
import { useParams } from "react-router-dom";
import { defaultUserId } from "../../utils";

export const VideosSideBar = () => {
  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetVideosByUserIdQuery(searchParams.get("user_id") || defaultUserId);

  let content;

  if (isLoading) {
    content = (
      <div className="text-center">
        <Spinner size={"10"} />
      </div>
    );
  } else if (isSuccess) {
    const otherVideos = data.videos.filter((video) => video.id !== videoId);
    content = <Videos videos={otherVideos} style="grid grid-cols-1 gap-4" />;
  } else if (isError) {
    content = (
      <div className="text-center font-bold text-lg mt-50">Unknown Error</div>
    );
  }

  return (
    <main className={`${"opacity-50" && isFetching} flex-col `}>
      {isLoading ? (
        <div className="text-center mt-10">
          <Spinner size={"10"} />
        </div>
      ) : isSuccess ? (
        <Videos
          videos={data.videos.filter((video) => video.id !== videoId)}
          style="grid grid-cols-1 gap-4 sm:h-36 md:h-40 2xl:h-80"
        />
      ) : (
        <div className="text-center font-bold text-lg mt-50">Unknown Error</div>
      )}
    </main>
  );
};
