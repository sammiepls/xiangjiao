import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactChild;
  closeModal: () => void;
};

const Modal = React.memo(({ children, closeModal }: Props) => {
  const domEl = document.getElementById("modal-root");

  if (!domEl) return null;

  return ReactDOM.createPortal(
    <div className="h-screen w-screen bg-black bg-opacity-50 fixed z-50 flex justify-center items-center">
      <div className="p-6 flex flex-col">
        <button
          className="bg-yellow rounded-full text-xl text-center w-8 h-8 justify-self-end self-end "
          onClick={closeModal}
        >
          ✖️
        </button>
        {children}
      </div>
    </div>,
    domEl
  );
});

export default Modal;
