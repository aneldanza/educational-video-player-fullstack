import { useGetImagePathsQuery } from "../app/createVideosApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { UploadVideoForm } from "./UploadVideoForm";
import { SearchBar } from "./SearchBar";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "50%",
//     borderRadius: "40px",
//   },
// };

Modal.setAppElement("#root");

export const NavBar = () => {
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

  return (
    <nav className="flex justify-between mb-5 font-body">
      <SearchBar />

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
        className="modal-custom"
        contentLabel="Upload Video Modal"
      >
        <UploadVideoForm closeModal={closeModal} />
      </Modal>
    </nav>
  );
};
