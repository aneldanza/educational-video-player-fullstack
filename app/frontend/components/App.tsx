import {
  useGetVideoByUserIdQuery,
  useUploadVideoMutation,
} from "../app/createVideosApi";

const userId = "anel_danza";

function csrfToken() {
  const meta = document.querySelector("meta[name=csrf-token]");
  const token = meta && meta.getAttribute("content");

  return token ?? false;
}

export function App() {
  const { data, error, isLoading, isError, isSuccess } =
    useGetVideoByUserIdQuery(userId);
  const [uploadVideo] = useUploadVideoMutation();

  // const canSave = [title, content, userId].every(Boolean)

  const uploadNewVideo = async () => {
    const video = {
      title: "THE SEED",
      description: "Inspirational Short Film",
      video_url: "https://youtu.be/sVPYIRF9RCQ?si=hBXm1yHSO00svGDN",
      user_id: "anel_danza",
    };

    const token = csrfToken() || "";

    try {
      await uploadVideo({ video, csrfToken: token }).unwrap();
    } catch (e) {
      console.error("failed to upload a video");
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <ul className="flex-col divide-y divide-white">
        {data.videos.map((video, i) => {
          return <li key={`video-${i}`}>{video.title}</li>;
        })}
      </ul>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="flex-col">
      <nav className="flex bg-slate-200 p-2 justify-between">
        <div>Logo</div>
        <div className="border border-black rounded-2xl px-5">search bar</div>
        <button
          className="border border-black rounded-xl px-2 cursor-pointer"
          onClick={uploadNewVideo}
        >
          Upload
        </button>
      </nav>
      <main className="bg-slate-700 p-2 text-white">{content}</main>
    </div>
  );
}
