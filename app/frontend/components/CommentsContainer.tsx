import { Comments } from "./Comments";
import { NewComment } from "./NewComment";
import { useParams } from "react-router-dom";

interface CommentsContainerProps {
  num: number;
}

export const CommentsContainer: React.FC<CommentsContainerProps> = ({
  num,
}) => {
  const { videoId } = useParams();
  return (
    <div className=" flex flex-col space-y-4 px-2 text-sm lg:h-full lg:overflow-auto sm:h-40 sm:overflow-hidden">
      <div className="font-semibold text-lg">{`Comments ${num}`}</div>
      
      {videoId && <NewComment videoId={videoId} />}

      {num > 0 && videoId && <Comments videoId={videoId} />}
    </div>
  );
};
