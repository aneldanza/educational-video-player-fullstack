import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import moment from 'moment'

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
    const dateMoment = moment(data.video["created_at"]);
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
            <div className="font-bold text-lg">{data.video.title}</div>
            <div className="flex space-x-3 text-sm">
              <div>{data.video["user_id"]}</div>
              <div>
                <span>{`Uploaded ${dateMoment.format("MMMM Do YYYY")}`}</span> 
      
              </div>
            </div>
          </div>
          <div className="text-sm">{data.video.description}</div>
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
