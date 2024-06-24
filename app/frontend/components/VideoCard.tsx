import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import ReactPlayer from "react-player";
import { VideoData } from "../types";

interface VideoCardProps {
  video: VideoData;
  light: boolean;
  style: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  light,
  style,
}) => {

  return (
    <>
      <div className={`${style} `} >
        <ReactPlayer
          url={video["video_url"]}
          controls={false}
          width="100%"
          height="100%"
          light={light}
          style={{
            borderRadius: "40px",
            overflow: "hidden",
          }}
        />
      </div>
      <div className="font-semibold text-lg">{video.title}</div>
      <div className="flex space-x-3 text-sm">
        <div>{video["user_id"]}</div>
        <div>
          <span>{`Uploaded ${moment(video["created_at"]).fromNow()}`}</span>
        </div>
      </div>
      <div className="flex space-x-1">
        <ChatBubbleLeftIcon className="w-3 align-middle" />
        <span className="text-xs">{`${video.num_comments} comments`}</span>
      </div>
    </>
  );
};
