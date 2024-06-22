import { useUploadVideoMutation } from "../app/createVideosApi";

function csrfToken() {
  const meta = document.querySelector("meta[name=csrf-token]");
  const token = meta && meta.getAttribute("content");

  return token ?? "";
}

export const NavBar = () => {
  const [uploadVideo] = useUploadVideoMutation();

  // const canSave = [title, content, userId].every(Boolean)

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
  );
};
