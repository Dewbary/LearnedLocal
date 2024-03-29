import { useEffect, useState } from "react";
import type { PropsWithChildren, ReactNode } from "react";
import styles from "./CustomModal.module.css";

interface Props extends PropsWithChildren {
  className?: string;
  button: ReactNode;
  visible?: boolean;
  onOpen?: () => void;
}

export default function CustomModal({
  className,
  button,
  visible = false,
  children,
  onOpen,
}: Props) {
  const [displayModal, setDisplayModal] = useState(visible);

  useEffect(() => {
    setDisplayModal(visible);
  }, [visible]);

  const hideModal = function () {
    setDisplayModal(false);
  };

  const showModal = function () {
    if (onOpen) {
      onOpen();
    }
    setDisplayModal(true);
  };

  return (
    <>
      <div onClick={() => showModal()}>{button}</div>

      <div
        className={`fixed inset-0 z-40 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50 ${
          (displayModal ? styles["modal-visible"] : styles["modal-hidden"]) ||
          ""
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={`${
              className ?? ""
            } relative bg-ll-grey w-full max-w-5xl lg:rounded-3xl h-full lg:h-fit min-h-screen lg:min-h-0 `}
          >
            <button
              type="button"
              onClick={() => hideModal()}
              className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white lg:right-3 lg:top-3"
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

            {children}
          </div>
        </div>
      </div>
    </>
  );
}
