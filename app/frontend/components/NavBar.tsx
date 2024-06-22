import {
  useUploadVideoMutation,
  useGetImagePathsQuery,
} from "../app/createVideosApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { csrfToken } from "../utils";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export const NavBar = () => {
  const [uploadVideo] = useUploadVideoMutation();
  const { data, isError, isSuccess, error } = useGetImagePathsQuery("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      await uploadVideo({ video, token }).unwrap();
    } catch (e) {
      console.error("failed to upload a video");
    }
  };

  return (
    <nav className="flex justify-between mb-5 font-body">
      <div className="border border-black rounded-2xl px-5 self-center">
        search bar
      </div>

      <Link to={"/"}>
        <img src={data && data.logoColor} className="w-56" />
      </Link>

      <div className="primary-btn" onClick={openModal}>
        Upload
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >Upload New Video</Modal>
    </nav>
  );
};
