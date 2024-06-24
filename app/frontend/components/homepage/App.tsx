import { useSearchParams } from "react-router-dom";
import { useGetVideosByUserIdQuery } from "../../app/createVideosApi";
import { Videos } from "../layout-components/Videos";
import { Spinner } from "../Spinner";
import { defaultUserId } from "../../utils";

export function App() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, isSuccess, isFetching } =
    useGetVideosByUserIdQuery(searchParams.get("user_id") || defaultUserId);

  let content;

  if (isLoading) {
    content = (
      <div className="mt-50 text-center">
        <Spinner size={"40"} />
      </div>
    );
  } else if (isSuccess) {
    if (data && data.videos.length > 0) {
      content = (
        <Videos
          videos={data.videos}
          style="grid grid-cols-1 gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 "
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
    content = (
      <div className="text-center font-bold text-lg mt-50">Unknown Error</div>
    );
  }

  return (
    <div className="flex-col">
      <main className={`${"opacity-50" && isFetching}`}>{content}</main>
    </div>
  );
}
