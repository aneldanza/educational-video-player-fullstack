import { useGetCommentsByVideoIdQuery } from "../../app/createVideosApi";
import moment from "moment";
import { Spinner } from "../Spinner";

interface CommentsProps {
  videoId: string;
}

export const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const { data, isLoading, isSuccess } =
    useGetCommentsByVideoIdQuery(videoId);
  return (
    <>
      {isSuccess ? (
        data.comments.map((comment, i) => {
          const dateMoment = moment(comment["created_at"])
          return (
            <div className="flex flex-col space-y-2" key={`comment-${i}`}>
              <div className="flex space-x-3">
                <div className="w-5 h-5 rounded-full flex justify-center items-center bg-gray-300">
                  <p>{comment["user_id"][0].toLowerCase()}</p>

                </div>
                <div className="font-semibold">{comment["user_id"].toLowerCase()}</div>
                <div>{dateMoment.fromNow()}</div>
              </div>
              <div className="border p-2 ml-8 rounded-r-2xl rounded-bl-2xl bg-gray-200">{comment.content}</div>
            </div>
          );
        })
      ) : isLoading ? (
        <div><Spinner size={'10'} /></div>
      ) : (
        <div className="font-semibold">Unknown Error. Could not get comments.</div>
      )}
    </>
  );
};
