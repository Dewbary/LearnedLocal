import * as React from "react";

const EmailSignup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mx-24 mb-4 text-center text-3xl lg:text-2xl">
        Not seeing an experience? Get notified when there are new experiences in
        your area!
      </p>

      <button onClick={openModal} className="btn-outline btn-ghost btn mb-8">
        Subscribe For Experience Updates
      </button>
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Minimal Modal Example"
        className="fixed flex items-center justify-center rounded-xl bg-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <iframe
          src="https://cdn.forms-content.sg-form.com/c47b4367-ff5d-11ed-ac99-0292391286ae"
          title="Subscription Form"
          className="h-96 w-96 px-4"
        />
        <button
          onClick={closeModal}
          className="btn-sm btn-circle btn absolute right-2 top-2"
        >
          ✕
        </button>
      </ReactModal>
    </div>
  );
};

export default EmailSignup;
