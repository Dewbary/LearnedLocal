import * as React from "react";
import ReactModal from "react-modal";
import { InboxArrowDownIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

type Props = {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const EmailSignup = ({ modalIsOpen, openModal, closeModal }: Props) => {
  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <div onClick={openModal} className="bg-gradient-to-br from-amber-400 to-amber-500 p-4 drop-shadow-md rounded-full fixed bottom-3 right-3 lg:bottom-10 lg:right-10 flex flex-row justify-center items-center gap-3 hover:cursor-pointer hover:from-amber-300 hover:to-amber-300">
        <div className="hidden lg:flex pl-2 font-3xl font-bold text-white">
          Subscribe for experience updates!
        </div>
        <div className="p-2 rounded-full bg-white">
          <EnvelopeIcon className="w-5 text-amber-500"/>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Minimal Modal Example"
        className="fixed flex h-3/4 w-full items-center justify-center rounded-xl bg-white lg:h-5/6 lg:w-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <iframe
          src="https://cdn.forms-content.sg-form.com/c47b4367-ff5d-11ed-ac99-0292391286ae"
          title="Subscription Form"
          className="h-full w-full pr-4"
        />
        <button
          onClick={closeModal}
          className="btn-md btn-circle btn absolute right-8 top-2 z-50 lg:right-2"
        >
          ✕
        </button>
      </ReactModal>
    </div>
    </>
  );
};

export default EmailSignup;
