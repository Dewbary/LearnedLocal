import Image, { type StaticImageData } from "next/image";
import { Typography } from "../common/Typography";

type Props = {
    stepImage: StaticImageData;
    stepImageAlt: string;
    stepNumber: string;
    stepTitle: string;
    stepDescription: string;
    leftStep: boolean;
}

export default function HostStep({stepImage, stepImageAlt, stepNumber, stepTitle, stepDescription, leftStep} : Props) {
    return (
        <>
            <div className="flex flex-row w-full gap-2">
                <div className="bg-ll-black z-[5] w-20 h-20 flex-shrink-0 rounded-full flex flex-col items-center justify-center text-3xl text-ll-grey font-inter lg:hidden">{stepNumber}</div>
                <div className="flex flex-col lg:flex-row basis-auto gap-6">
                    <div className={`flex flex-col px-3 gap-1 lg:basis-2/5 ${leftStep ? "lg:order-1" : "lg:order-3"}`}>
                        <div className={Typography.SectionTitle}>{stepTitle}</div>
                        <div className={Typography.BodyText}>{stepDescription}</div>
                    </div>
                    <div className="lg:basis-1/5 lg:flex justify-center hidden lg:order-2">
                        <div className="bg-ll-black z-[5] w-20 h-20 flex-shrink-0 rounded-full flex flex-col items-center justify-center text-3xl text-ll-grey font-inter">{stepNumber}</div>
                    </div>
                    <div className={`relative aspect-[3/2] overflow-hidden rounded-2xl lg:w-96 lg:basis-2/5 ${leftStep ? "lg:order-3" : "lg:order-1"}`}>
                        <Image
                            src={stepImage}
                            alt={stepImageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}