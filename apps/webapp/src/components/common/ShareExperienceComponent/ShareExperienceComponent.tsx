import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
//import { shareOnMobile } from "react-mobile-share";
import QRCode from "react-qr-code";
import CustomModal from "../CustomModal";
import { ChatBubbleOvalLeftIcon, DocumentDuplicateIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import instagramImage from "../../../../assets/instagram-icon.png";
import facebookImage from "../../../../assets/facebook-icon.png";
import { ExperienceInfo } from "packages/db/types/types";
import fillerCard from "../../../../assets/filler_card.png";

type Props = {
    experience: ExperienceInfo | null | undefined;
}

export default function ShareExperienceComponent({ experience }: Props) {

    const experienceUrl = `https://learnedlocal.app/experience/view/${experience?.id}`;

    const handleMobileShareClick = async function () {

        const coverImage = await fetch(experience?.photos.at(0) || fillerCard.src);
        const coverImageBlob = await coverImage.blob();
        const coverImageFile = new File([coverImageBlob], "expimg.png");

        await navigator.share({
            url: experienceUrl,
            text: `Sign up for ${experience?.title} with me!`,
            title: `Learned Local: ${experience?.title}`,
            files: [coverImageFile]
        });
    }

    const handleCopyURLClick = async function () {
        await navigator.clipboard.writeText(experienceUrl);
        alert("URL Copied!");
    }

    const handleEmailClick = async function () {
        window.location.href = `mailto:?to=&subject=${encodeURI("Sign up for this experience with me!")}&body=${encodeURI(`Hey,\n\nCheck out this experience on Learned Local!\n\n${experienceUrl}\n\nHope to see you there!`)}`;
    }

    const handleMessageClick = async function () {
        window.location.href = `sms:///&body=${encodeURI(`Sign up for this experience with me!${experienceUrl}`)}`;
    }

    const handleInstagramClick = async function () {
        window.location.href = `https://instagram.com/create/story`;
    }

    return (
        <>
            <CustomModal
                button={
                    <div className="flex flex-row items-center hover:cursor-pointer gap-2">
                        <ArrowUpTrayIcon width={20} height={20} className="text-ll-black"/>
                        <p className="hidden md:block font-inter underline text-sm">Share</p>
                    </div>
                }>
                
                <div className="min-h-screen lg:min-h-fit pt-20 lg:pt-10 flex flex-col items-center w-full px-10 gap-5 pb-10">
                    <h3 className="font-raleway font-bold text-xl">Share this experience</h3>
                    <div className="flex flex-col gap-3 items-center w-full max-w-xs">
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1" onClick={() => handleMessageClick()}>
                            <div className="basis-1/6">
                                <ChatBubbleOvalLeftIcon className="w-9 h-9 text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Messages</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1" onClick={() => handleEmailClick()}>
                            <div className="basis-1/6">
                                <EnvelopeIcon className="w-9 h-9 text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Email</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1" onClick={() => handleCopyURLClick()}>
                            <div className="basis-1/6">
                                <DocumentDuplicateIcon className="w-9 h-9 text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Copy Link</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1" onClick={() => handleInstagramClick()}>
                            <div className="basis-1/6">
                                <Image 
                                    src={instagramImage}
                                    alt="Instagram Icon"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className="font-inter font-medium text-sm">Instagram</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1">
                            <div className="basis-1/6">
                                <Image 
                                    src={facebookImage}
                                    alt="Facebook Icon"
                                    width={31}
                                    height={31}
                                />
                            </div>
                            <div className="font-inter font-medium text-sm">Facebook</div>
                        </div>
                    </div>
                    
                </div>
                
            </CustomModal>

            
            {/* <div className={`bg-black bg-opacity-90 h-screen w-screen fixed inset-0 z-50 ${showShareBox ? "" : "hidden"}`}>
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
            </div> */}
        </>
    )
}