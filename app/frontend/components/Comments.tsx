import { useGetCommentsByVideoIdQuery } from "../app/createVideosApi";
import { useParams } from "react-router-dom";

interface CommentsProps {
  num: number;
}

export const Comments: React.FC<CommentsProps> = ({ num }) => {
  const { videoId } = useParams();
  const { data, isLoading, isSuccess, error } = useGetCommentsByVideoIdQuery(
    videoId || ""
  );
  return (
    <>
      <div className="font-semibold">{`Comments ${num}`}</div>
      {isSuccess ? (
        data.comments.map((comment: any) => {
          return <div>{JSON.stringify(comment, null, 2)}</div>;
        })
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>{JSON.stringify(error, null, 2)}</div>
      )}
    </>
  );
};
