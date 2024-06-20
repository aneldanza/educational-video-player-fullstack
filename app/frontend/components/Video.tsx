import { useGetVideoByIdQuery } from "../app/createVideosApi";

interface VideoProps {
  videoId: string;
}

export const Video: React.FC<VideoProps> = ({ videoId }) => {
  const { data, isLoading, isError, isSuccess, error } =
    useGetVideoByIdQuery(videoId);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = <ul className={`flex-col divide-y divide-white `}>{data}</ul>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <>{content}</>;
};
