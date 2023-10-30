import { useState } from "react";
import { SignIn, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

type Props = {
    isSignedIn: boolean;
};

export default function NavBar ({ isSignedIn } : Props) {

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenuClicked = () => {
        setMenuOpen(false);
    }

    const openMenuClicked = () => {
        setMenuOpen(true);
    }

    return (
        <>
            <div className="navbar bg-ll-grey pl-4 pr-5 fixed z-20">

                {/* Navbar title and logo */}
                <div className="navbar-start font-raleway font-bold text-xl lg:text-4xl">
                    LearnedLocal
                </div>

                {/* Mid-navbar links */}
                <div className="navbar-center">
                    <div className="hidden lg:flex gap-8 font-inter text-sm">
                        <a href="/about" className="hover:bg-ll-blue hover:cursor-pointer hover:text-ll-grey w-36 rounded-full h-12 flex justify-center items-center transition-colors">
                            Our story
                        </a>
                        <a href="/host" className="hover:bg-ll-blue hover:cursor-pointer hover:text-ll-grey w-36 rounded-full h-12 flex justify-center items-center transition-colors">
                            Become a host
                        </a>
                        <a href="/" className="hover:bg-ll-blue hover:cursor-pointer hover:text-ll-grey w-36 rounded-full h-12 flex justify-center items-center transition-colors">
                            Find an experience
                        </a>
                        <a href="/blog" className="hover:bg-ll-blue hover:cursor-pointer hover:text-ll-grey w-36 rounded-full h-12 flex justify-center items-center transition-colors">
                            Our blog
                        </a>
                    </div>
                </div>

                {/* Navbar end, responsive mobile hamburger menu / login button */}
                <div className="navbar-end">
                    <div className="w-4 h-4 lg:hidden" hidden={!menuOpen} onClick={closeMenuClicked}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <path d="M16.7692 17.6587L8.88464 9.32934L16.7692 1" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1.00004 17.8576L8.88464 9.52831L1.00004 1.19897" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="w-5 h-4 lg:hidden" hidden={menuOpen} onClick={openMenuClicked}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21" fill="none">
                            <line x1="1" y1="1" x2="22" y2="1" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="1" y1="11" x2="22" y2="11" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="1" y1="20" x2="22" y2="20" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <div className="hidden lg:flex rounded-full border-2 border-ll-black p-2 font-inter text-sm">
                        {!isSignedIn ? (
                            <>
                                <SignInButton>
                                    <div className="rounded-full w-20 h-12 flex justify-center items-center hover:bg-ll-blue hover:text-ll-grey hover:cursor-pointer transition-colors">
                                        Login
                                    </div>
                                </SignInButton>
                                <SignUpButton>
                                    <div className="rounded-full w-24 h-12 flex justify-center items-center bg-ll-yellow hover:bg-opacity-60 hover:cursor-pointer transition-opacity">
                                        Join
                                    </div>
                                </SignUpButton>
                            </>
                        ) : (
                            <>
                                <div className="rounded-full w-32 h-12 flex justify-center items-center bg-ll-yellow hover:bg-opacity-60 hover:cursor-pointer transition-opacity">
                                    My Experiences
                                </div>
                                <SignOutButton>
                                    <div className="rounded-full w-20 h-12 flex justify-center items-center hover:bg-ll-blue hover:text-ll-grey hover:cursor-pointer transition-colors">
                                        Logout
                                    </div>
                                </SignOutButton>
                            </>
                        )}
                    </div>
                </div>
            </div>


            {/* The following code is for the mobile hamburger menu "dropdown" */}
            <div className="bg-ll-grey w-screen h-screen fixed top-0 left-0 z-10 lg:hidden" hidden={!menuOpen}>
                <div className="flex flex-col items-center gap-20 font-inter pt-36">
                    <div className="flex flex-col gap-8 items-center text-ll-black">
                        <a href="/about">
                            Our story
                        </a>
                        <a href="/host">
                            Become a host
                        </a>
                        <a href="/">
                            Find an experience
                        </a>
                        <a href="/blog">
                            Our blog
                        </a>
                    </div>
                    <div className="flex flex-col gap-8 items-center text-sm">
                        {!isSignedIn ? (
                            <>
                                <SignInButton>
                                    <button className="rounded-full border-2 border-ll-black w-36 h-12 flex justify-center items-center">
                                        <div>Login</div>
                                    </button>
                                </SignInButton>

                                <SignUpButton>
                                    <div className="rounded-full border-2 border-ll-black w-36 h-12 flex justify-center items-center text-ll-grey bg-ll-black">
                                        Join
                                    </div>
                                </SignUpButton>
                            </>
                        ) : (
                            <>
                                <div className="rounded-full border-2 border-ll-blue w-36 h-12 flex justify-center items-center text-ll-grey bg-ll-blue">
                                    My Experiences
                                </div>
                                <SignOutButton>
                                    <button className="rounded-full border-2 border-ll-black w-36 h-12 flex justify-center items-center">
                                        <div>Logout</div>
                                    </button>
                                </SignOutButton>
                            </>
                            
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}