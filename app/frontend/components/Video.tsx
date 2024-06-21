import { useGetVideoByIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";

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
      <ul className={`flex-col divide-y divide-white `}>{JSON.stringify(data, null, 2)}</ul>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>
  <div>Single Video Page</div>
  {content}</>;
};
