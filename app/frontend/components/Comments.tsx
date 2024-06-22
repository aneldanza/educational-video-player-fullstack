import { useGetCommentsByVideoIdQuery } from "../app/createVideosApi";

interface CommentsProps {
  videoId: string;
}

export const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const { data, isLoading, isSuccess, error } =
    useGetCommentsByVideoIdQuery(videoId);
  return (
    <>
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
