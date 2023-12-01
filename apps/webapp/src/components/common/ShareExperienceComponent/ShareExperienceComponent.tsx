import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
//import { shareOnMobile } from "react-mobile-share";
import QRCode from "react-qr-code";

type Props = {
    experienceId: number;
}

export default function ShareExperienceComponent({ experienceId }: Props) {

    const experienceUrl = `https://learnedlocal.app/experience/view/${experienceId}`;

    const [showShareBox, setShowShareBox] = useState(false);

    const handleShareButtonClick = function () {
        setShowShareBox(true);
    }

    const handleExitShareClick = function () {
        setShowShareBox(false);
    }

    const handleMobileShareClick = async function () {
        await navigator.share({url: experienceUrl});
    }

    const handleCopyURLClick = async function () {
        await navigator.clipboard.writeText(experienceUrl);
        alert("URL Copied!");
    }

    return (
        <>
            <div className="flex flex-row items-center hover:cursor-pointer gap-2" onClick={() => handleShareButtonClick()}>
                <ArrowUpTrayIcon width={20} height={20} className="text-ll-black"/>
                <p className="hidden md:block font-inter underline text-sm">Share</p>
            </div>
            
            <div className={`bg-black bg-opacity-90 h-screen w-screen fixed inset-0 z-50 ${showShareBox ? "" : "hidden"}`}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-64 bg-ll-grey rounded-xl">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-black absolute top-4 right-4 cursor-pointer" 
                        viewBox="0 0 24 24"
                        onClick={() => handleExitShareClick()}
                        >
                        <path fill="currentColor" d="M14.83 12l5.59-5.59c.54-.54.54-1.41 0-1.95-.54-.54-1.41-.54-1.95 0L12 10.05 6.41 4.46c-.54-.54-1.41-.54-1.95 0-.54.54-.54 1.41 0 1.95L10.05 12l-5.59 5.59c-.54.54-.54 1.41 0 1.95.54.54 1.41.54 1.95 0L12 13.95l5.59 5.59c.54.54 1.41.54 1.95 0 .54-.54.54-1.41 0-1.95L13.95 12z"/>
                    </svg>
                    <h1 className="text-3xl font-raleway font-bold absolute top-2 left-1/2 -translate-x-1/2">Share</h1>
                    <div className="absolute top-14 flex flex-col items-center w-full px-4 font-inter">
                        <div className="flex gap-3 w-full">
                            <button 
                                className="basis-1/2 bg-ll-blue text-white font-semibold p-2 rounded-lg"
                                onClick={() => handleCopyURLClick()}
                            >
                                Copy URL
                            </button>
                            <button 
                                className="basis-1/2 bg-ll-dark-green text-white font-semibold p-2 rounded-lg"
                                onClick={() => handleMobileShareClick()}
                            >
                                Mobile
                            </button>
                        </div>
                        <div className="p-5">
                            <QRCode 
                                value={experienceUrl}
                                bgColor="#F1F0EE"
                                className="w-36 h-36"
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}