import { useGetVideoByIdQuery } from "../../app/createVideosApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReactPlayer from "react-player";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { VideosSideBar } from "./VideosSideBar";
import { CommentsContainer } from "./CommentsContainer";
import { Spinner } from "../Spinner";

export const VideoPage: React.FC = () => {
  const { videoId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetVideoByIdQuery(
    videoId || ""
  );

  return (
    <div className="flex lg:flex-row lg:space-x-7 md:flex-row md:space-x-4 sm:flex-row flex-col space-y-4">
      {isLoading ? (
        <div className="text-center mt-30">
          <Spinner size={"20"} />
        </div>
      ) : isError ? (
        <div className="text-center font-bold text-lg mt-50">Unknown Error</div>
      ) : (
        isSuccess && (
          <div className="w-full lg:basis-2/3 md:basis-2/3 h-full flex flex-col justify-items-center  font-body h-viewport space-y-3 ">
            <div className={"2xl:h-170 xl:h-150 lg:h-130 md:h-96 sm:h-64 h-56"}>
              <ReactPlayer
                url={data.video["video_url"]}
                controls={true}
                width="100%"
                height="100%"
                style={{
                  borderRadius: "40px",
                  overflow: 'hidden'
                }}
              />
            </div>
            <div className="font-bold text-2xl">{data.video.title}</div>
            <div className="flex space-x-3 text-sm">
              <div>{data.video["user_id"]}</div>
              <div>
                <span>{`Uploaded ${moment(data.video["created_at"]).format(
                  "MMMM Do YYYY"
                )}`}</span>
              </div>
            </div>
            <div className="flex space-x-1">
              <ChatBubbleLeftIcon className="w-3 align-middle" />
              <span className="text-xs">{`${data.video.num_comments} comments`}</span>
            </div>

            <div className="border border-gray-100 rounded-lg p-2 bg-gray-100 text-sm">
              {data.video.description}
            </div>

            <CommentsContainer num={data.video["num_comments"]} />
          </div>
        )
      )}
      <div className="lg:basis-1/3 justify-self-center">
        <VideosSideBar />
      </div>
    </div>
  );
};
