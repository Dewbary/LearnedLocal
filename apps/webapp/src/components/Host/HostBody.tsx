import Image from "next/image";
import hostMainImage from "../../../assets/host/host_main.jpg";
import step1Image from "../../../assets/host/become_step_1.jpg";
import step2Image from "../../../assets/host/become_step_2.jpg";
import step3Image from "../../../assets/host/become_step_3.jpg";
import step4Image from "../../../assets/host/become_step_4.jpg";
import step5Image from "../../../assets/host/become_step_5.jpg";
import HostStep from "./HostStep";
import { Typography } from "../common/Typography";

export default function HostBody() {
    return (
        <>
            <div className="flex flex-col w-full px-5 gap-10 max-w-5xl py-5">
                <div className="flex flex-col lg:flex-row w-full gap-8 lg:items-center">
                    <div className="flex flex-col w-full gap-8">
                        <div className={Typography.PrimaryTitle}>
                            Become a host
                        </div>
                        <div className="overflow-hidden rounded-3xl relative aspect-[3/4] max-w-sm">
                            <Image
                                src={hostMainImage}
                                alt="A Learned Local host, smiling"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <p className={Typography.BodyText}>
                            At Learned Local, we hold the belief that each and every one of us possesses a valuable 
                            contribution to offer our community. Whether it&apos;s hosting a regular game night, 
                            crafting model rockets, or organizing lively foosball tournaments, we understand that 
                            people are eager to share these enriching experiences and connect with neighbors and 
                            friends in the real world.
                        </p>
                        <p className={Typography.BodyText}>
                            What if we told you there was a fantastic way to achieve all this while also earning 
                            some extra income by doing what you love? Through your side hustle, you can leverage 
                            your unique skills and passions to enhance your community. By hosting your own experience, 
                            you&apos;re not only fostering meaningful friendships but also weaving unforgettable 
                            memories that we all yearn for. Join us in building those cherished connections and 
                            lasting moments.
                        </p>
                    </div>
                </div>
                <div className="flex flex-row lg:justify-center w-full">
                    <h1 className="text text-3xl font-raleway font-semibold">How it works</h1>
                </div>
                <div className="block relative w-full">
                    <div className="flex flex-col w-full gap-5 relative lg:gap-10">
                        <HostStep 
                            stepImage={step1Image} 
                            stepImageAlt="Creating an account" 
                            stepTitle="Create your account" 
                            stepDescription="Create a login with us on Learned Local to ensure the best experience." 
                            stepNumber="01" 
                            leftStep={true} 
                        />
                        <HostStep
                            stepImage={step2Image}
                            stepImageAlt="Creating an experience"
                            stepTitle="Create your experience"
                            stepDescription='To create your experience, visit the "My Experiences" page. Click "Create an experience" and follow the provided steps.'
                            stepNumber="02"
                            leftStep={false}
                        />
                        <HostStep
                            stepImage={step3Image}
                            stepImageAlt="The review team meets"
                            stepTitle="Get approved"
                            stepDescription='To ensure the quality of each experience on the platform, our team will perform a brief review. You can expect this process to take 1 to 3 business days.'
                            stepNumber="03"
                            leftStep={true}
                        />
                        <HostStep
                            stepImage={step4Image}
                            stepImageAlt="Woman marketing her experience"
                            stepTitle="Market your experience"
                            stepDescription='Share your experience with your friends, family, and followers using the share tools on your experience page.'
                            stepNumber="04"
                            leftStep={false}
                        />
                        <HostStep
                            stepImage={step5Image}
                            stepImageAlt="Getting paid for teaching"
                            stepTitle="Get paid"
                            stepDescription='Get rewarded for your dedicated efforts with Learned Local, where you get to keep the bulk (80%) of your earnings.'
                            stepNumber="05"
                            leftStep={true}
                        />
                    </div>
                    <div className="absolute h-full left-10 top-1 border border-dashed border-gray-400 w-0 lg:left-1/2" />
                </div>
                <div className="bg-ll-tan w-full rounded-3xl flex flex-col p-7 lg:p-16 gap-5">
                    <h1 className={Typography.SecondaryTitle}>Frequently Asked Questions</h1>
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className={Typography.SectionTitle}>Can anyone host an experience?</h2>
                        <p className={Typography.BodyText}>Yes! You just need to get approval from our experience review team, who will make sure your experience is appropriate and that you have safety guidelines met, if necessary.</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className={Typography.SectionTitle}>Where can I host my experience?</h2>
                        <p className={Typography.BodyText}>Currently, our operation is limited to the Utah County area in Utah. We have a space where you can teach small groups if necessary; contact us for more information!</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className={Typography.SectionTitle}>How much money can I earn by hosting an experience?</h2>
                        <p className={Typography.BodyText}>You set the price per participant in your experience. You&apos;ll make 80% of the admissions to your experience that are sold through Learned Local - the other 20% helps us cover transaction fees, website hosting, and advertising costs.</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <h2 className={Typography.SectionTitle}>How will I get paid for hosting?</h2>
                        <p className={Typography.BodyText}>We currently transfer through zelle and venmo. You&apos;ll receive payment for teaching promptly after the experience has passed.</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}