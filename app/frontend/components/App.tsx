import { useGetVideosByUserIdQuery } from "../app/createVideosApi";
import { Link } from "react-router-dom";
import { VideoCard } from "./VideoCard";

const userId = "anel_danza";

export function App() {
  const { data, error, isLoading, isError, isSuccess, isFetching } =
    useGetVideosByUserIdQuery(userId);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div className={`grid grid-cols-1 gap-4 lg:grid-cols-3`}>
        {data.videos.map((video, i) => {
          return (
            <Link
              key={`video-${i}`}
              to={`videos/${video.id}`}
              className="no-underline text-black"
            >
              <div className="">
                <VideoCard video={video} light={true} />
              </div>
            </Link>
          );
        })}
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="flex-col">
      <main className={`${"opacity-50" && isFetching}`}>{content}</main>
    </div>
  );
}
