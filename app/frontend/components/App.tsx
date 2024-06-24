import { useGetVideosByUserIdQuery } from "../app/createVideosApi";
import { Videos } from "./Videos";

const userId = "anel_danza";

export function App() {
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetVideosByUserIdQuery(userId);

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    if (data && data.videos.length > 0) {
      content = (
        <Videos
          videos={data.videos}
          style="grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2 "
        />
      );
    } else {
      content = (
        <div className="text-center text-lg mt-50">
          There were not videos found
        </div>
      );
    }
  } else if (isError) {
    content = <div className="text-center text-lg mt-50">Unknown Error</div>;
  }

  return (
    <div className="flex-col">
      <main className={`${"opacity-50" && isFetching}`}>{content}</main>
    </div>
  );
}
