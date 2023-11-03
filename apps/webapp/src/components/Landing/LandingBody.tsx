import rightArrowImage from "../../../assets/landing/right_arrow.png";
import bakingImage from "../../../assets/landing/baking_image.jpg";
import tennisImage from "../../../assets/landing/tennis_image.jpg";
import compassGraphic from "../../../assets/landing/compass_graphic.png";
import handshakeGraphic from "../../../assets/landing/handshake_graphic.png";
import brainGraphic from "../../../assets/landing/brain_graphic.png";
import sailingImage from "../../../assets/landing/sailing_image.jpg";
import gardeningImage from "../../../assets/landing/gardening_image.jpg";
import Image from "next/image";
import Link from "next/link";

export default function LandingBody() {
  return (
    <>
      <div className="flex max-w-6xl flex-col items-center gap-5 bg-ll-grey p-5 lg:gap-10">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-5">
          <div className="flex flex-col gap-5 lg:basis-3/5">
            <div className="flex w-full flex-col gap-5 rounded-3xl bg-ll-green px-7 py-9 lg:p-16">
              <div className="font-raleway text-4xl font-semibold">
                Creating unique <br />
                experiences &amp; local <br />
                connections
              </div>
              <div className="font-inter font-light">
                We help communities discover unique experiences and foster
                meaningful connections. Our mission is to facilitate authentic
                experiences in your community while supporting aspiring
                businesses.
              </div>
            </div>

            <div className="aspect-h-12 aspect-w-11 relative w-full overflow-hidden rounded-3xl lg:hidden">
              <Image
                src={bakingImage}
                alt="two people baking together"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-5 lg:flex-grow lg:flex-row">
              <Link
                href="/home"
                className="flex w-full flex-row items-center justify-around gap-2 rounded-3xl bg-ll-blue p-7 font-inter text-ll-grey transition-colors hover:cursor-pointer hover:bg-ll-yellow hover:text-ll-black lg:order-2 lg:basis-1/4 lg:flex-col"
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
              </Link>

              <div className="aspect-h-1 aspect-w-2 relative w-full overflow-hidden rounded-3xl lg:aspect-w-4 lg:order-1 lg:basis-3/4">
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
            <div className="aspect-h-4 aspect-w-3 relative hidden w-full overflow-hidden rounded-3xl lg:block">
              <Image
                src={bakingImage}
                alt="two people baking together"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center rounded-3xl bg-ll-tan px-7 py-9">
          <div className="mb-5 font-raleway text-2xl font-semibold lg:mb-0">
            Why LearnedLocal?
          </div>
          <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-around">
            <div className="flex flex-col items-center gap-2 font-inter">
              <div className="aspect-h-1 aspect-w-1 w-24">
                <Image
                  src={compassGraphic}
                  alt="Drawing of a compass"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="">Explore new interests</div>
            </div>
            <div className="flex flex-col items-center gap-2 font-inter">
              <div className="aspect-h-1 aspect-w-1 w-40">
                <Image
                  src={handshakeGraphic}
                  alt="Drawing of a handshake"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="">Connect with others</div>
            </div>
            <div className="flex flex-col items-center gap-2 font-inter">
              <div className="aspect-h-1 aspect-w-1 w-24">
                <Image
                  src={brainGraphic}
                  alt="Drawing of a brain"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="">Make lasting memories</div>
            </div>
          </div>
        </div>

        <div className="mt-5 w-full font-raleway text-3xl font-semibold lg:hidden">
          Experience With Us
        </div>

        <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:gap-32">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl">
            <div className="aspect-h-4 aspect-w-3">
              <Image
                src={sailingImage}
                alt="woman on a sailboat"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="relative flex w-full flex-col gap-2 rounded-lg bg-ll-black px-6 pb-10 pt-3 text-ll-grey">
                <div className="font-raleway text-xl font-bold">
                  Sailing with Jenny
                </div>
                <div className="font-inter">Lindon, UT</div>
              </div>
            </div>
          </div>

          <div className="hidden w-full flex-col items-center gap-5 lg:flex">
            <div className="mt-5 w-full font-raleway text-3xl font-semibold">
              Experience With Us
            </div>
            <div className="flex flex-col gap-5 font-inter">
              <div className="">
                LearnedLocal presents a rich variety of experiences, which can
                span anywhere from star gazing and photography to immersive
                pursuits like blacksmithing and pottery. Our selection is
                ever-evolving as our local hosts continuously craft new exciting
                experiences for the community.
              </div>
              <Link
                href="/home"
                className="flex h-14 w-52 items-center justify-center rounded-full bg-ll-yellow text-sm font-medium transition-opacity hover:cursor-pointer hover:bg-opacity-60"
              >
                <span>Explore Experiences</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:gap-32">
          <div className="hidden w-full flex-col items-center gap-5 lg:flex">
            <div className="mt-10 w-full font-raleway text-3xl font-semibold">
              Our Mission
            </div>

            <div className="flex flex-col gap-5 font-inter">
              <div className="">
                At LearnedLocal, our mission is driven by the belief that
                venturing beyond your comfort zone not only elevates your
                spirits but also unveils the path to discovering new passions.
                We established LearnedLocal with the vision of facilitating this
                journey and creating enduring memories. Moreover, we aim to
                foster community connections and fortify their bonds. We proudly
                stand by those aspiring to transform their passions into
                thriving businesses as they embark on their journey as hosts.
              </div>
              <Link
                href="/host"
                className="flex h-14 w-52 items-center justify-center rounded-full bg-ll-yellow text-sm font-medium transition-opacity hover:cursor-pointer hover:bg-opacity-60"
              >
                <span>Start Hosting</span>
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl">
            <div className="aspect-h-4 aspect-w-3">
              <Image
                src={gardeningImage}
                alt="man gardening with his neighbor"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-5">
              <div className="relative flex w-full flex-col gap-2 rounded-lg bg-ll-black px-6 pb-10 pt-3 text-ll-grey">
                <div className="font-raleway text-xl font-bold">
                  Gardening with Damon
                </div>
                <div className="font-inter">Springville, UT</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 font-inter lg:hidden">
          <div className="">
            LearnedLocal presents a rich variety of experiences, which can span
            anywhere from star gazing and photography to immersive pursuits like
            blacksmithing and pottery. Our selection is ever-evolving as our
            local hosts continuously craft new exciting experiences for the
            community.
          </div>
          <Link
            href="/home"
            className="flex h-14 w-52 items-center justify-center rounded-full bg-ll-yellow"
          >
            <span>Explore Experiences</span>
          </Link>
        </div>

        <div className="mt-10 w-full font-raleway text-3xl font-semibold lg:hidden">
          Our Mission
        </div>

        <div className="flex flex-col gap-5 font-inter lg:hidden">
          <div className="">
            At LearnedLocal, our mission is driven by the belief that venturing
            beyond your comfort zone not only elevates your spirits but also
            unveils the path to discovering new passions. We established
            LearnedLocal with the vision of facilitating this journey and
            creating enduring memories. Moreover, we aim to foster community
            connections and fortify their bonds. We proudly stand by those
            aspiring to transform their passions into thriving businesses as
            they embark on their journey as hosts.
          </div>
          <Link
            href="/host"
            className="flex h-14 w-52 items-center justify-center rounded-full bg-ll-yellow"
          >
            <span>Start Hosting</span>
          </Link>
        </div>

        <div className="flex w-full flex-col gap-5 rounded-3xl bg-ll-green px-7 py-9 lg:items-center lg:px-56 lg:py-32">
          <div className="text-center font-raleway text-2xl font-semibold">
            &quot;As a hobbyist myself, I was disappointed that there
            wasn&apos;t a platform to get paid for my knowledge and skills, so
            we created one.&quot;
          </div>
          <div className="font-inter">Aaron J, Founder</div>
        </div>
      </div>
    </>
  );
}
