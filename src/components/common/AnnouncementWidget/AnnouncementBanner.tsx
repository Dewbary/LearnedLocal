import { useState } from "react";

type Props = {
    text: string;
}

export default function AnnouncementBanner (props: Props) {

    const [isVisible, setIsVisible] = useState(true);

    function hideBanner() {
        setIsVisible(false);
    }

    return (
        <div className={`${isVisible ? "flex" : "hidden"} flex-row justify-between items-center bg-gradient-to-br from-amber-300 to-amber-400 gap-3 px-2 py-2 lg:pl-5 font-bold`}>
            <div className="flex flex-row justify-start gap-3 items-center">
                <img
                    src="/logo_white_bg.png"
                    alt="company logo"
                    className="w-9"
                />
                {props.text}
            </div>
            <div>
                <button className="p-2 outline outline-1 rounded-full" onClick={() => hideBanner()}>
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
    )
}