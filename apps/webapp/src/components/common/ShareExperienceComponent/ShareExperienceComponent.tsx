import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import CustomModal from "../CustomModal";
import { ChatBubbleOvalLeftIcon, DocumentDuplicateIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import instagramImage from "../../../../assets/instagram-icon.png";
import { ExperienceInfo } from "packages/db/types/types";
import { env } from "packages/config/env.mjs";
import { Facebook } from "react-feather";

type Props = {
    experience: ExperienceInfo | null | undefined;
}

export default function ShareExperienceComponent({ experience }: Props) {

    const experienceUrl = `https://learnedlocal.app/experience/view/${experience?.id || 0}`;

    const handleCopyURLClick = async function () {
        await navigator.clipboard.writeText(experienceUrl);
        alert("URL Copied!");
    }

    const handleEmailClick = function () {
        window.location.href = `mailto:?to=&subject=${encodeURI("Sign up for this experience with me!")}&body=${encodeURI(`Hey,\n\nCheck out this experience on Learned Local!\n\n${experienceUrl}\n\nHope to see you there!`)}`;
    }

    const handleMessageClick = function () {
        window.location.href = `sms:///&body=${encodeURI(`Sign up for this experience with me!${experienceUrl}`)}`;
    }

    const handleOtherClick = async function () {
        await navigator.share({
            url: experienceUrl,
            text: `Sign up for ${experience?.title || ""} with me!`,
            title: `Learned Local: ${experience?.title || ""}`
        });
    }

    const handleFacebookClick = function () {
        window.location.href = `https://www.facebook.com/dialog/share?app_id=${encodeURI(env.NEXT_PUBLIC_FACEBOOK_APP_ID)}&display=touch&href=${encodeURI(experienceUrl)}&redirect_uri=${encodeURI(experienceUrl)}`;
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
                    <h3 className="font-raleway font-bold text-xl lg:w-96 text-center">Share this experience</h3>
                    <div className="flex flex-col gap-3 items-center w-full max-w-xs">
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1 hover:cursor-pointer hover:border-2 hover:border-ll-black transition-colors text-ll-black" onClick={() => handleMessageClick()}>
                            <div className="basis-1/6">
                                <ChatBubbleOvalLeftIcon className="w-9 h-9"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Messages</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1 hover:cursor-pointer hover:border-2 hover:border-ll-black transition-colors" onClick={() => handleEmailClick()}>
                            <div className="basis-1/6">
                                <EnvelopeIcon className="w-9 h-9 text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Email</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1 hover:cursor-pointer hover:border-2 hover:border-ll-black transition-colors" onClick={() => handleCopyURLClick()}>
                            <div className="basis-1/6">
                                <DocumentDuplicateIcon className="w-9 h-9 text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Copy link</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1 hover:cursor-pointer hover:border-2 hover:border-ll-black transition-colors" onClick={() => handleOtherClick()}>
                            <div className="basis-1/6">
                                <ArrowUpTrayIcon width={30} height={30} className="text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Other</div>
                        </div>
                        <div className="border border-gray-400 w-full px-4 h-16 flex flex-row rounded-lg items-center gap-1 hover:cursor-pointer hover:border-2 hover:border-ll-black transition-colors" onClick={() => handleFacebookClick()}>
                            <div className="basis-1/6">
                                <Facebook width={30} height={30} className="text-ll-black"/>
                            </div>
                            <div className="font-inter font-medium text-sm">Facebook</div>
                        </div>
                    </div>
                    
                </div>
                
            </CustomModal>
        </>
    )
}