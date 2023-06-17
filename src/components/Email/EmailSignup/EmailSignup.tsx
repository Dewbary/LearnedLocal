import * as React from "react";
import ReactModal from "react-modal";

type Props = {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const EmailSignup = ({ modalIsOpen, openModal, closeModal }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-4 text-center text-2xl lg:text-2xl">
        Not seeing an experience? Get notified when there are new experiences in
        your area!
      </p>

      <button onClick={openModal} className="btn-outline btn-ghost btn mb-8">
        Subscribe For Experience Updates
      </button>
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
  );
};

export default EmailSignup;
