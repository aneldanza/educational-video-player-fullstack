import { useSearchParams } from "react-router-dom";
import { VideoData } from "../../types";
import { Link } from "react-router-dom";
import { VideoCard } from "./VideoCard";
import { defaultUserId } from "../../utils";


interface VideosProps {
  videos: VideoData[];
  style: string;
}

export const Videos: React.FC<VideosProps> = ({ videos, style }) => {
  const [searchParams] = useSearchParams()
  return (
    <div className={style}>
      {videos.map((video, i) => {
        return (
          <Link
            key={`video-${i}`}
            to={`/videos/${video.id}?user_id=${searchParams.get("user_id") || defaultUserId}`}
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
