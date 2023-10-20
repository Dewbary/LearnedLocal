import { useUser } from "@clerk/nextjs";
import * as React from "react";
import NavBar from "~/components/NavBar/NavBar";

const AboutPage = () => {
  const user = useUser();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <NavBar isSignedIn={user.isSignedIn ?? false} className="bg-white" />
      <div className="mx-10 mt-20 flex flex-col items-center">
        <span id="aboutlearnedlocal" />
        <h2 className="text-center text-4xl font-bold lg:text-7xl">
          What is Learned Local?
        </h2>
        <p className="mt-6 text-left text-xl lg:mx-24">
          Having a hard time thinking of date night ideas? Looking for fun
          things to do in Utah and Provo? Why not learn a new hobby from a
          talented individual or business right where you live? Come find an
          experience and create a memory with us while building a stronger sense
          of community!
        </p>
        <p className="mt-6 text-left text-xl lg:mx-24">
          We believe that everyone has hobbies, passions, and interests that
          makes them unique. We made Learned Local as a place for members of
          your community to come together and share these interests with each
          other, in events that we like to call &quot;experiences&quot;. Along
          the way, you&apos;ll forge friendships, create memories, and discover
          that you have a lot more in common with the people around you than you
          think. Sign up for an experience today!
        </p>

        <div className="mt-10 flex w-full items-center justify-center mb-10">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-h-5 flex w-full items-center justify-center max-w-3xl max-h-48">
            <iframe
              src="https://www.youtube.com/embed/leKfHxT_6II"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
