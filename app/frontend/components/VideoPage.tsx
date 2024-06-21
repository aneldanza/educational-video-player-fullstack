import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import moment from "moment";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Comments } from "./Comments";

interface VideoProps {}

export const VideoPage: React.FC<VideoProps> = () => {
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
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-items-center  font-body h-viewport ">
        <div className="p-2 lg:h-96 h-56">
          <ReactPlayer
            url={data.video["video_url"]}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
        <div className="p-2 flex flex-col space-y-2">
          <div className="font-bold text-lg">{data.video.title}</div>
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
          <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm">
            {data.video.description}
          </div>
          {data.video["num_comments"] > 0 && (
            <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm lg:h-full lg:overflow-auto sm:h-40 sm:overflow-hidden">
              <Comments num={data.video["num_comments"]} />
            </div>
          )}
        </div>
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>{content}</>;
};
