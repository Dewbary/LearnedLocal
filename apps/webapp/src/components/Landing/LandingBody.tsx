import rightArrowImage from "../../../assets/landing/right_arrow.png";
import bakingImage from "../../../assets/landing/baking_image.jpg";
import tennisImage from "../../../assets/landing/tennis_image.jpg";
import compassGraphic from "../../../assets/landing/compass_graphic.png";
import handshakeGraphic from "../../../assets/landing/handshake_graphic.png";
import brainGraphic from "../../../assets/landing/brain_graphic.png";
import sailingImage from "../../../assets/landing/sailing_image.jpg";
import gardeningImage from "../../../assets/landing/gardening_image.jpg";
import Image from "next/image";

export default function LandingBody() {
    return (
        <>
            <div className="bg-ll-grey p-5 flex flex-col items-center gap-5 pt-20 lg:py-24 max-w-6xl lg:gap-10">

                <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-stretch">
                    <div className="lg:basis-3/5 flex flex-col gap-5">
                        <div className="bg-ll-green rounded-3xl px-7 py-9 flex flex-col gap-5 w-full lg:flex-grow">
                            <div className="font-raleway text-3xl">
                                Creating unique experiences &amp; local connections
                            </div>
                            <div className="font-inter">
                                We help communities discover unique experiences and foster meaningful connections.
                                Our mission is to facilitate authentic experiences in your community while 
                                supporting aspiring businesses.
                            </div>
                        </div>

                        <div className="rounded-3xl overflow-hidden relative w-full aspect-w-11 aspect-h-12 lg:hidden">
                            <Image
                                src={bakingImage}
                                alt="two people baking together"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col lg:flex-row gap-5">
                            <a 
                                href="/"
                                className="rounded-3xl bg-ll-blue text-ll-grey font-inter w-full p-7 flex flex-row justify-around gap-2 items-center lg:order-2 lg:basis-1/4 lg:flex-col hover:bg-ll-yellow hover:text-ll-black hover:cursor-pointer transition-colors"
                            >
                                <div className="basis-3/5">
                                    Find your next local experience with us
                                </div>
                                <div className="basis-2/5">
                                    <Image
                                        src={rightArrowImage}
                                        alt="right pointing arrow"
                                        className="w-full"
                                    />
                                </div>
                            </a>

                            <div className="rounded-3xl overflow-hidden relative w-full aspect-w-2 aspect-h-1 lg:aspect-w-4 lg:order-1 lg:basis-3/4">
                                <Image
                                    src={tennisImage}
                                    alt="two people talking about tennis"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                        </div>
                        
                    </div>
                    <div className="lg:basis-2/5">
                        <div className="rounded-3xl overflow-hidden relative w-full aspect-w-11 aspect-h-12 hidden lg:block">
                            <Image
                                src={bakingImage}
                                alt="two people baking together"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-ll-tan rounded-3xl px-7 py-9 flex flex-col items-center w-full">
                    <div className="font-raleway text-2xl mb-5 lg:mb-0">
                        Why LearnedLocal?
                    </div>
                    <div className="flex flex-col gap-5 items-center w-full lg:flex-row lg:justify-around lg:items-end">
                        <div className="font-inter flex flex-col items-center gap-2">
                            <div className="w-24 aspect-w-1 aspect-h-1">
                                <Image
                                    src={compassGraphic}
                                    alt="Drawing of a compass"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="">
                                Explore new interests
                            </div>
                        </div>
                        <div className="font-inter flex flex-col items-center gap-2">
                            <div className="w-32 aspect-w-1 aspect-h-1">
                                <Image
                                    src={handshakeGraphic}
                                    alt="Drawing of a handshake"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="">
                                Connect with others
                            </div>
                        </div>
                        <div className="font-inter flex flex-col items-center gap-2">
                            <div className="w-24 aspect-w-1 aspect-h-1">
                                <Image
                                    src={brainGraphic}
                                    alt="Drawing of a brain"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="">
                                Make lasting memories
                            </div>
                        </div> 
                    </div>
                </div>

                <div className="font-raleway text-3xl mt-5 w-full lg:hidden">
                    Experience With Us
                </div>

                <div className="flex flex-col gap-5 w-full items-center lg:flex-row lg:gap-32">
                    <div className="rounded-3xl overflow-hidden relative w-full max-w-sm">
                        <div className="aspect-w-3 aspect-h-4">
                            <Image
                                src={sailingImage}
                                alt="woman on a sailboat"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-5">
                            <div className="bg-ll-black text-ll-grey relative rounded-lg w-full flex flex-col px-6 pt-3 pb-10 gap-3">
                                <div className="font-raleway text-xl">
                                    Sailing with Jenny
                                </div>
                                <div className="font-inter">
                                    Lindon, UT
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:flex flex-col w-full gap-5 items-center hidden">
                        <div className="font-raleway text-3xl mt-5 w-full">
                            Experience With Us
                        </div>
                        <div className="flex flex-col font-inter gap-5">
                            <div className="">
                                LearnedLocal presents a rich variety of experiences, which can span anywhere from star gazing
                                and photography to immersive pursuits like blacksmithing and pottery. Our selection is ever-evolving
                                as our local hosts continuously craft new exciting experiences for the community.
                            </div>
                            <a href="/" className="bg-ll-yellow w-52 h-14 flex justify-center items-center rounded-full hover:bg-opacity-60 hover:cursor-pointer transition-opacity">
                                <span>Explore Experiences</span>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-5 w-full items-center lg:flex-row lg:gap-32">
                    <div className="lg:flex flex-col gap-5 w-full items-center hidden">
                        <div className="font-raleway text-3xl mt-10 w-full">
                            Our Mission
                        </div>

                        <div className="flex flex-col font-inter gap-5">
                            <div className="">
                                At LearnedLocal, our mission is driven by the belief that venturing beyond your comfort zone 
                                not only elevates your spirits but also unveils the path to discovering new passions. We established 
                                LearnedLocal with the vision of facilitating this journey and creating enduring memories. Moreover, 
                                we aim to foster community connections and fortify their bonds. We proudly stand by those aspiring 
                                to transform their passions into thriving businesses as they embark on their journey as hosts.
                            </div>
                            <a href="/host" className="bg-ll-yellow w-52 h-14 flex justify-center items-center rounded-full hover:bg-opacity-60 hover:cursor-pointer transition-opacity">
                                <span>Start Hosting</span>
                            </a>
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden relative w-full max-w-sm">
                        <div className="aspect-w-3 aspect-h-4">
                            <Image
                                src={gardeningImage}
                                alt="man gardening with his neighbor"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-5">
                            <div className="bg-ll-black text-ll-grey relative rounded-lg w-full flex flex-col px-6 pt-3 pb-10 gap-3">
                                <div className="font-raleway text-xl">
                                    Gardening with Damon
                                </div>
                                <div className="font-inter">
                                    Springville, UT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col font-inter gap-5 lg:hidden">
                    <div className="">
                        LearnedLocal presents a rich variety of experiences, which can span anywhere from star gazing
                        and photography to immersive pursuits like blacksmithing and pottery. Our selection is ever-evolving
                        as our local hosts continuously craft new exciting experiences for the community.
                    </div>
                    <a href="/" className="bg-ll-yellow w-52 h-14 flex justify-center items-center rounded-full">
                        <span>Explore Experiences</span>
                    </a>
                </div>

                <div className="font-raleway text-3xl mt-10 w-full lg:hidden">
                    Our Mission
                </div>

                <div className="flex flex-col font-inter gap-5 lg:hidden">
                    <div className="">
                        At LearnedLocal, our mission is driven by the belief that venturing beyond your comfort zone 
                        not only elevates your spirits but also unveils the path to discovering new passions. We established 
                        LearnedLocal with the vision of facilitating this journey and creating enduring memories. Moreover, 
                        we aim to foster community connections and fortify their bonds. We proudly stand by those aspiring 
                        to transform their passions into thriving businesses as they embark on their journey as hosts.
                    </div>
                    <a href="/host" className="bg-ll-yellow w-52 h-14 flex justify-center items-center rounded-full">
                        <span>Start Hosting</span>
                    </a>
                </div>

                <div className="bg-ll-green rounded-3xl px-7 py-9 flex flex-col gap-5 w-full lg:p-32 lg:items-center">
                    <div className="font-raleway text-3xl">
                        &quot;As a hobbyist myself, I was disappointed that there wasn&apos;t a platform to get paid for my
                        knowledge and skills, so we created one.&quot;
                    </div>
                    <div className="font-inter">
                        Aaron J, Founder
                    </div>
                </div>
                
            </div>
        </>
    )
}