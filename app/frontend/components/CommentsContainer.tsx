import { Comments } from "./Comments";

interface CommentsProps {
  num: number;
}

export const CommentsContainer: React.FC<CommentsProps> = ({ num }) => {
  return (
    <div className="border border-gray-100 rounded-md px-2 px-1 bg-gray-100 text-sm lg:h-full lg:overflow-auto sm:h-40 sm:overflow-hidden">
      {num > 0 && <Comments num={num} />}
    </div>
  );
};
