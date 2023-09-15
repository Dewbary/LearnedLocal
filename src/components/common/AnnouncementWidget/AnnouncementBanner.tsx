import { useState } from "react";
import Image from "next/image";

type Props = {
  text: string;
};

export default function AnnouncementBanner(props: Props) {
  const [isVisible, setIsVisible] = useState(true);

  function hideBanner() {
    setIsVisible(false);
  }

  return (
    <div
      className={`${
        isVisible ? "flex" : "hidden"
      } flex-row items-center justify-center gap-3 bg-amber-100 px-2 py-2 font-semibold lg:pl-5`}
    >
      <div className="flex flex-row items-center justify-start gap-3">
        <Image
          src="/logo_white_bg.png"
          alt="company logo"
          width={200}
          height={200}
          className="w-9"
        />
        {props.text}
      </div>
      <div>
        <button
          className="rounded-full p-2 outline outline-1"
          onClick={() => hideBanner()}
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
    </div>
  );
}
