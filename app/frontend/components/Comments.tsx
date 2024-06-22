interface CommentsProps {
  num: number;
}

export const Comments: React.FC<CommentsProps> = ({ num }) => {
  return (
    <>
    <div className="font-semibold">{`Comments ${num}`}</div>
    {/* {comments.map(comment => {
        return(
            <div>{JSON.stringify(comment, null, 2)}</div>
        )
    })} */}
    </>

  )
};
