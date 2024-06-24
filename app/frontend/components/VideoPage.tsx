import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReactPlayer from "react-player";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
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
    const dateMoment = moment(data.video["created_at"]);
    content = (
      <div className="flex lg:flex-row lg:space-x-5 md:flex-row md:space-x-4 flex-col">
        <div className="w-full lg:basis-2/3 md:basis-2/3 h-full flex flex-col justify-items-center  font-body h-viewport space-y-3 ">
          <div className={"lg:h-130 md:h-96 h-56"}>
            <ReactPlayer
              url={data.video["video_url"]}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="font-bold text-xl">{data.video.title}</div>
          <div className="flex space-x-3 text-sm">
            <div>{data.video["user_id"]}</div>
            <div>
              <span>{`Uploaded ${dateMoment.format("MMMM Do YYYY")}`}</span>
            </div>
          </div>
          <div className="flex space-x-1">
            <ChatBubbleLeftIcon className="w-3 align-middle" />
            <span className="text-xs">{`${data.video.num_comments} comments`}</span>
          </div>

          <div className="border border-gray-100 rounded-lg p-2 bg-gray-100 text-sm">
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
