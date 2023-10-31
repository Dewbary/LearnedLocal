import Link from "next/link";
import { Facebook, Instagram } from "react-feather";

export default function Footer() {
    return (
        <>
            <div className="bg-ll-black text-ll-grey px-6 py-8 flex flex-col gap-10 w-full lg:flex-row lg:gap-32 lg:px-14">
                <div className="flex flex-col gap-3 lg:flex-auto">
                    <div className="font-raleway">
                        STAY IN THE LOOP
                    </div>
                    <div className="font-inter text-sm">
                        Sign up with your email address to receive experience updates.
                    </div>
                    <div className="flex flex-row gap-4 font-inter">
                        <input className="text-ll-black w-44 px-3 text-sm" placeholder="Email Address"/>
                        <div className="rounded-full border border-ll-black text-ll-black text-sm bg-ll-grey px-3 lg:px-7 py-3 flex flex-row justify-center items-center hover:text-ll-grey hover:bg-ll-black transition-colors hover:cursor-pointer hover:border-ll-grey">
                            Sign Up
                        </div>
                    </div>
                    <div className="font-inter underline text-sm hover:cursor-pointer">
                        Privacy Policy
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="font-raleway">
                        CONTACT US
                    </div>
                    <div className="font-inter text-sm">
                        (385) 309-3194
                    </div>
                    <div className="font-inter text-sm">
                        11124 N 6000 W<br/>
                        Highland, UT 84003
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="font-raleway">
                        FOLLOW US
                    </div>
                    <div className="flex flex-row gap-3">
                        <Link href="https://www.instagram.com/learnedlocal/" target="_blank" className="bg-ll-grey text-ll-black p-1 rounded-full hover:bg-ll-black hover:text-ll-grey">
                            <Instagram />
                        </Link>
                        <Link
                            href="https://www.facebook.com/profile.php?id=100092194838632"
                            target="_blank"
                            className="bg-ll-grey text-ll-black p-1 rounded-full hover:bg-ll-black hover:text-ll-grey"
                        >
                            <Facebook />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}