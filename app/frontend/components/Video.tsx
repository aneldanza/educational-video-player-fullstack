import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

interface VideoProps {}

export const Video: React.FC<VideoProps> = () => {
  const { videoId } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetVideoByIdQuery(
    videoId || ""
  );

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <div className="flex flex-col justify-items-center">
        <div className="w-full md:w-32 lg:w-56">
          <ReactPlayer
            url={data.video["video_url"]}
            width="100%"
            height="auto"
            controls={true}
          />
          <div>
            <div>{data.video.title}</div>
            <div className="flex space-x-3">
              <div>{data.video["user_id"]}</div>
              <div>{data.video["created_at"]}</div>
            </div>
          </div>
          <div>{data.video.description}</div>
        </div>
      </div>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <>
      <div>Single Video Page</div>
      {content}
    </>
  );
};
