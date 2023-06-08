import * as React from "react";

const About = () => {
  return (
    <div className="mx-10 my-10 flex flex-col items-center">
      <h2 className="text-5xl font-bold lg:text-7xl">What is Learned Local?</h2>
      <h3 className="mt-6 text-center text-xl lg:mx-24">
        We believe that everyone has hobbies, passions, and interests that makes
        them unique. We made Learned Local as a place for members of your
        community to come together and share these interests with each other, in
        events that we like to call &quot;experiences&quot;. Along the way,
        you&apos;ll forge friendships, create memories, and discover that you
        have a lot more in common with the people around you than you think.
        Sign up for an experience today!
      </h3>

      <VideoPlayer />
    </div>
  );
};

export default About;
