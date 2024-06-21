import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import ReactPlayer from 'react-player'
import { VideoData } from "../types";

interface VideoCardProps {
  video: VideoData;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const dateMoment = moment(video["created_at"]);
  return (
    <>
      <div className="lg:h-96 h-56">
        <ReactPlayer
          url={video["video_url"]}
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div className="font-bold text-lg">{video.title}</div>
      <div className="flex space-x-3 text-sm">
        <div>{video["user_id"]}</div>
        <div>
          <span>{`Uploaded ${dateMoment.format("MMMM Do YYYY")}`}</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <ChatBubbleLeftIcon className="w-3 align-middle" />
        <span className="text-xs">{`${video.num_comments} comments`}</span>
      </div>
    </>
  );
};
