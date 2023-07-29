type GenericModalProps = {
  hideModal: () => void;
  modalHeaderContent: JSX.Element;
  modalContent: JSX.Element;
};

//TODO: remove this after modal refactor

export default function GenericModal({
  hideModal,
  modalHeaderContent,
  modalContent,
}: GenericModalProps) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white lg:h-5/6 lg:w-2/3 lg:rounded-3xl">
      {/* TOP BAR */}
      <div className="flex flex-row items-center justify-between bg-gradient-to-r from-amber-400 via-amber-200 to-white py-4 pr-6 pl-10 shadow-lg lg:rounded-t-3xl">
        {modalHeaderContent}
        <button
          type="button"
          onClick={() => hideModal()}
          className="ml-auto inline-flex h-9 items-center place-self-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {modalContent}
    </div>
  );
}
