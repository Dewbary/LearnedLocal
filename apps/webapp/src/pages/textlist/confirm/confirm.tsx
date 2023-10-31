import Image from "next/image";
import textlistGraphic from "../../../../assets/textlist/textlist_subscribed_graphic.png";
import Link from "next/link";

export default function Confirm() {
    return (
        <>
            <div className="bg-ll-grey flex flex-col items-center w-full min-h-screen">
                <div className="max-w-sm flex flex-col items-start w-full p-7 gap-5">
                    <div className="w-full flex flex-col items-end">
                        <Link className="w-4 h-4" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                <path d="M16.7692 17.6587L8.88464 9.32934L16.7692 1" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.00004 17.8576L8.88464 9.52831L1.00004 1.19897" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full aspect-w-2 aspect-h-1">
                            <Image
                                src={textlistGraphic}
                                alt={"A phone with some texts"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl font-raleway">
                            You&apos;re in!
                        </div>
                        <div className="font-inter">
                            We appreciate your subscription to our texting list. Updates are coming your way!
                        </div> 
                    </div>
                    <Link href="/" className="font-inter bg-ll-black rounded-full flex flex-col items-center py-4 w-full text-ll-grey text-sm">
                        Visit home page
                    </Link>
                </div>
            </div>
        </>
    )
}