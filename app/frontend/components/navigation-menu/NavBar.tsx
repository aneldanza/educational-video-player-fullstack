import { useSearchParams, useParams } from "react-router-dom";
import { useGetImagePathsQuery } from "../../app/createVideosApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { UploadVideoForm } from "./UploadVideoForm";
import { SearchBar } from "./SearchBar";
import { defaultUserId } from "../../utils";

Modal.setAppElement("#root");

export const NavBar = () => {
  const { data } = useGetImagePathsQuery("");
  const [searchParams] = useSearchParams();
  const { videoId } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<string>("");

  function openModal(action: string) {
    setAction(action);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="grid lg:grid-cols-3 lg:grid-rows-1 grid-rows-2 items-center mb-10 font-body">
      <div className="row-start-2 lg:row-start-1">
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 lg:col-span-2">
        <Link
          to={`/?user_id=${searchParams.get("user_id") || defaultUserId}`}
          className="lg:justify-self-center justify-self-start"
        >
          <img src={data && data.logoColor} className="w-56" />
        </Link>

        <div className="flex justify-self-end space-x-3 align-items-center">
          {videoId && (
            <div
              className="primary-btn  "
              onClick={openModal.bind(this, "edit")}
            >
              Edit
            </div>
          )}
          <div
            className="primary-btn "
            onClick={openModal.bind(this, "upload")}
          >
            Upload
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-custom"
        contentLabel="Upload Video Modal"
      >
        <UploadVideoForm closeModal={closeModal} action={action} />
      </Modal>
    </nav>
  );
};
