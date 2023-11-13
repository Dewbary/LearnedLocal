import NewNavBar from "~/components/NewNavBar";
import { useUser } from "@clerk/nextjs";
import Footer from "~/components/NewFooter/NewFooter";
import Image from "next/image";
import aaronArch from "../../../assets/about/aaron_arch_image.jpg";
import aaronImage from "../../../assets/about/aaron_image.jpg";
import brendanImage from "../../../assets/about/brendan_image.jpeg";
import chaseImage from "../../../assets/about/chase_image.jpg";
import graceImage from "../../../assets/about/grace_image.jpg";

export default function AboutPage () {

  const { isSignedIn } = useUser();

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center bg-ll-grey">
        <NewNavBar isSignedIn={isSignedIn || false} isMarketingNavBar={true}/>
        <div className="px-5 flex flex-col gap-8 pt-5 pb-16 w-full lg:max-w-5xl">
          <div className="text-3xl font-raleway font-semibold">Our Story</div>
          <div className="flex flex-col gap-8 w-full lg:flex-row lg:items-center lg:gap-12">
            <div className="w-full lg:basis-1/3">
              <div className="relative aspect-[5/7] overflow-hidden rounded-2xl">
                <Image
                  src={aaronArch}
                  alt="Aaron Jarrett, founder of Learned Local"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="font-inter text-sm flex flex-col gap-3 font-light lg:basis-2/3 lg:text-base">
              <p>Hello, my name is AJ and I am the founder of Learned Local. My passion for connecting with others and creating unique experiences started in 2019 as a tour guide in Alaska. I was amazed to see so many travel from all over the world, seeking to create unforgettable memories. As someone who couldn&apos;t afford to travel far, I began to wonder if instead I could find fun things to do to do in my own community. Turns out there wasn&apos;t a very good platform to do that, so I met some incredible cofounders that turned my dreams into a reality.</p>
              <p>Learned Local is the platform where talented people can share their passion without all the busy work of obtaining a business license, paying for and creating a website, handing all the payment, and scheduling. We do all the hard work so you can focus on doing what you love.</p>
              <p>I believe everyone has something to share with the world, and I really hope we as a community can step out of our shells and celebrate our differences through learning from each other. If you&apos;re looking to create unforgettable memories, support local individuals, and join an inviting community, you are in the right place. Welcome!</p>
            </div>
          </div>
          <div className="flex flex-col bg-ll-tan items-center rounded-3xl gap-10 p-10 lg:pb-16 w-full">
            <div className="text-3xl font-semibold font-raleway">
              Our team
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex flex-col items-center gap-5">
                <Image
                  src={aaronImage}
                  alt="Aaron Jarrett"
                  width={180}
                  height={180}
                  className="rounded-2xl"
                />
                <div className="flex flex-col items-center font-inter">
                  <div className="font-bold">Aaron Jarrett</div>
                  <div>Founder</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src={brendanImage}
                  alt="Brendan Dewberry"
                  width={180}
                  height={180}
                  className="rounded-2xl"
                />
                <div className="flex flex-col items-center font-inter">
                  <div className="font-bold">Brendan Dewberry</div>
                  <div>Developer</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src={chaseImage}
                  alt="Chase Maxfield"
                  width={180}
                  height={180}
                  className="rounded-2xl"
                />
                <div className="flex flex-col items-center font-inter">
                  <div className="font-bold">Chase Maxfield</div>
                  <div>Developer</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src={graceImage}
                  alt="Grace Sorensen"
                  width={180}
                  height={180}
                  className="rounded-2xl"
                />
                <div className="flex flex-col items-center font-inter">
                  <div className="font-bold">Grace Sorensen</div>
                  <div>Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
