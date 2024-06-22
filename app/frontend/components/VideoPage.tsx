import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import { VideoCard } from "./VideoCard";
import { VideosSideBar } from "./VideosSideBar";
import { CommentsContainer } from "./CommentsContainer";

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
      <div className="flex lg:flex-row lg:space-x-5 md:flex-row md:space-x-4 flex-col">
        <div className="w-full lg:basis-2/3 md:basis-2/3 h-full flex flex-col justify-items-center  font-body h-viewport space-y-3 ">
          <VideoCard video={data.video} light={false} style={'lg:h-130 md:h-96 h-56'} />

          <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm">
            {data.video.description}
          </div>

          <CommentsContainer num={data.video["num_comments"]} />
        </div>
        <div className="lg:w-500px justify-self-center">
          <VideosSideBar />
        </div>
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>{content}</>;
};
