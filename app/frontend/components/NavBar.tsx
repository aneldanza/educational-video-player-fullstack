import { useGetImagePathsQuery } from "../app/createVideosApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { UploadVideoForm } from "./UploadVideoForm";
import { SearchBar } from "./SearchBar";

Modal.setAppElement("#root");

export const NavBar = () => {
  const { data } = useGetImagePathsQuery("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-2 items-center mb-5 font-body">
      <div className="row-start-2 lg:row-start-1">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 lg:col-span-2">
        <Link to={"/"} className="lg:justify-self-center justify-self-start">
          <img src={data && data.logoColor} className="w-56" />
        </Link>

        <div className="primary-btn justify-self-end " onClick={openModal}>
          Upload
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-custom"
        contentLabel="Upload Video Modal"
      >
        <UploadVideoForm closeModal={closeModal} />
      </Modal>
    </nav>
  );
};
