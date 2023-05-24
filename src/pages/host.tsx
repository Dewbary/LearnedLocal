import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import NavBar from "~/components/NavBar/NavBar";
import Image from "next/image";
import Footer from "~/components/Footer/Footer";

export default function Host() {

    const user = useUser();

    return (
        <>
            <Head>
                <title>Learned Local - Host an Experience</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Looking for ways to make extra money or start a side hustle? Host an experience with Learned Local and help build your community while you're at it!" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* NAVBAR */}

            <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-white drop-shadow-md lg:bg-opacity-0 lg:drop-shadow-none"/>

            {/* TITLE */}

            <div className="bg-gradient-to-br from-amber-400  to-amber-500 pt-5">
                <div className="flex flex-col lg:flex-row mx-10 mt-16 lg:mt-0 items-center gap-5 lg:gap-20 justify-center">
                    <div className="flex flex-col gap-5">
                        <h1 className="text-5xl lg:text-7xl font-bold">Host an Experience</h1>
                        <p className="text-xl">Help build your community while getting paid to do what you love</p>
                    </div>
                    <img src="/sapiens_2.png" className="w-96"/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center mx-5 mt-5 lg:mt-0 lg:mx-20">
                <div className="lg:basis-1/2 flex flex-col gap-7 bg-white border p-7 drop-shadow-lg rounded-3xl">
                    <h2 className="text-3xl lg:text-5xl font-bold">Why host?</h2>
                    <p>At Learned Local, we believe that everyone has something to give to their community, whether that be running a weekly game night, building model rockets, or organizing foosball tournaments. We believe that people want to share these kinds of experiences and connect with their neighbors and friends in person. So what better way to do that than by starting a side hustle to earn some extra cash and do what you love, all while contributing your unique skills and interests to your community? By hosting an experience, you can help us build the friendships and create the memories we all long for.</p>
                </div>
                <div className="relative lg:basis-1/2 lg:p-16">
                    <img src="/art_class.png" alt="art class at Learned Local" className="rounded-3xl drop-shadow-lg" />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center mx-5 mt-5 lg:mt-0 lg:mx-20">
                <div className="lg:basis-1/2 flex flex-col gap-7 lg:order-2 bg-white border p-7 drop-shadow-lg rounded-3xl">
                    <h2 className="text-3xl lg:text-5xl font-bold">Embrace Unique</h2>
                    <p>There are endless ways to contribute, because we are endlessly unique! Here are some examples of experiences you could host in your community:</p>
                    <ul>
                        <li>- A Beekeeping Basics Tutorial</li>
                        <li>- A Family Martial Arts Masterclass</li>
                        <li>- A Guided History Tour of your City</li>
                        <li>- A D&D Dungeonmaster Course</li>
                        <li>- A Food Preservation and Storage Night</li>
                        <li>- An Introduction to Fly Fishing</li>
                    </ul>
                </div>
                <div className="relative lg:basis-1/2 lg:p-16">
                    <img src="/rock_climbing.png" alt="rock climbing class at Learned Local" className="rounded-3xl drop-shadow-lg"/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center mx-5 mt-5 lg:mt-0 lg:mx-20">
                <div className="lg:basis-1/2 flex flex-col gap-7 bg-white border p-7 drop-shadow-lg rounded-3xl">
                    <h2 className="text-3xl lg:text-5xl font-bold">How can I host?</h2>
                    <p>It&apos;s easy to get started hosting experiences with Learned Local!</p>
                    <ol>
                        <li>1. Create a Learned Local account</li>
                        <li>2. On the &quot;My Experiences&quot; page, create your experience</li>
                        <li>3. Wait for approval from our experience review team (1-3 business days)</li>
                        <li>4. Share your experience with your friends, family, and followers using the share tools on your experience page</li>
                    </ol>
                </div>
                <div className="relative lg:basis-1/2 lg:p-16">
                    <img src="/pottery.png" alt="pottery class at Learned Local" className="rounded-3xl drop-shadow-lg"/>
                </div>
            </div>

            <div className="mx-5 lg:mx-20 border-t-2 pt-10 my-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-5">FAQs</h2>
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-xl">Can anyone host an experience?</h3>
                    <p>Yes! You just need to get approval from our experience review team, who will make sure your experience is appropriate and that you have safety guidelines met, if necessary.</p>
                    <h3 className="font-bold text-xl">Where can I host my experience?</h3>
                    <p>Currently, our operation is limited to the Utah County area in Utah. We have a space where you can teach small groups if necessary; contact us for more information!</p>
                    <h3 className="font-bold text-xl">How much money can I earn by hosting an experience?</h3>
                    <p>You set the price per participant in your experience. You&apos;ll make 85% of the admissions to your experience that are sold through Learned Local - the other 15% helps us cover transaction fees, website hosting, and advertising costs.</p>
                </div>
            </div>

            <Footer />
        </>
    );
}