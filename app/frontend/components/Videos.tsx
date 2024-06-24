import { VideoData } from "../types";
import { Link } from "react-router-dom";
import { VideoCard } from "./VideoCard";

interface VideosProps {
  videos: VideoData[];
  style: string;
}

export const Videos: React.FC<VideosProps> = ({ videos, style }) => {
  return (
    <div className={style}>
      {videos.map((video, i) => {
        return (
          <Link
            key={`video-${i}`}
            to={`/videos/${video.id}`}
            className="no-underline text-black"
          >
            <VideoCard
              video={video}
              style={"w-full h-56 lg:h-64 md:h-56 self-center"}
            />
          </Link>
        );
      })}
    </div>
  );
};
