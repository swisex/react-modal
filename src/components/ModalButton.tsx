import React, { useState } from "react";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import MadalView from "./ModalView";

export default function ModalButton() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button id="modalButton" onClick={openModal}>
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Challenge4 Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "50%",
            overflow: "auto",
            position: "relative",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <MadalView />
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </button>
      </Modal>
    </div>
  );
}
