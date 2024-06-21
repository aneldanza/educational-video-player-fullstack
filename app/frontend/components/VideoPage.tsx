import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import { Comments } from "./Comments";
import { VideoCard } from "./VideoCard";

export const VideoPage: React.FC = () => {
  const { videoId } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetVideoByIdQuery(
    videoId || ""
  );

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-items-center  font-body h-viewport p-2 space-y-3 ">
        <VideoCard video={data.video} />

        <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm">
          {data.video.description}
        </div>

        {data.video["num_comments"] > 0 && (
          <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm lg:h-full lg:overflow-auto sm:h-40 sm:overflow-hidden">
            <Comments num={data.video["num_comments"]} />
          </div>
        )}
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>{content}</>;
};
