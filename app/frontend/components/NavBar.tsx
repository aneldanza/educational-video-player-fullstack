import {
  useUploadVideoMutation,
  useGetImagePathsQuery,
} from "../app/createVideosApi";
import { Link } from "react-router-dom";

function csrfToken() {
  const meta = document.querySelector("meta[name=csrf-token]");
  const token = meta && meta.getAttribute("content");

  return token ?? "";
}

export const NavBar = () => {
  const [uploadVideo] = useUploadVideoMutation();
  const { data, isError, isSuccess, error } = useGetImagePathsQuery("");
  // const canSave = [title, content, userId].every(Boolean)

  if (isError) {
    console.log(error);
  } else if (isSuccess) {
    console.log(data);
  }

  const uploadNewVideo = async () => {
    const video = {
      title: "One Earth",
      description: "Environmental Short Film",
      video_url: "https://youtu.be/QQYgCxu988s?si=4RcBhqzxE6jclaLW",
      user_id: "anel_danza",
    };

    const token = csrfToken();

    try {
      await uploadVideo({ video, csrfToken: token }).unwrap();
    } catch (e) {
      console.error("failed to upload a video");
    }
  };

  return (
    <nav className="flex justify-between mb-5 font-body">
      <div className="border border-black rounded-2xl px-5 self-center">
        search bar
      </div>

      <Link to={'/'}><img src={data && data.logoColor} className="w-56" /></Link>

      <div
        className="border border-carribean text-white rounded-3xl py-2 px-6 cursor-pointer self-center bg-carribean"
        onClick={uploadNewVideo}
      >
        Upload
      </div>
    </nav>
  );
};
