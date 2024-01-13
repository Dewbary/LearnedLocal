import * as React from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  photos: string[];
};

const ExpImageCarousel = ({ photos }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [showOverlay, setShowOverlay] = React.useState(false);

  const handleClickImage = function (imageIndex: number) {
    setShowOverlay(true);
    setSelectedImageIndex(imageIndex);
  };

  const handleClickHideOverlay = function () {
    setShowOverlay(false);
  };

  const handleClickNextImage = function () {
    if (selectedImageIndex === photos.length - 1) {
      setSelectedImageIndex(0);
    } else {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleClickPreviousImage = function () {
    if (selectedImageIndex === 0) {
      setSelectedImageIndex(photos.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center md:mx-0">
      <div className="relative h-5/6 w-5/6 md:mx-4 md:w-full">
        <Image
          alt="experience photo"
          src={photos[selectedImageIndex] ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="cursor-pointer rounded-3xl object-cover shadow-lg duration-300 ease-in-out hover:scale-105 hover:opacity-50"
          onClick={() => handleClickImage(selectedImageIndex)}
        />
      </div>
      <button
        className="absolute left-4 my-auto rounded-full bg-ll-grey p-2 opacity-50 duration-300 ease-in-out md:-left-4"
        onClick={() => handleClickPreviousImage()}
      >
        <ChevronLeftIcon width={30} height={30} color="black opacity-100" />
      </button>
      <button
        className="absolute right-4 my-auto rounded-full bg-ll-grey p-2 opacity-50 duration-300 ease-in-out md:-right-4"
        onClick={() => handleClickNextImage()}
      >
        <ChevronRightIcon width={30} height={30} color="black" />
      </button>

      <div
        className={`fixed inset-0 z-40 h-screen w-screen bg-black bg-opacity-90 ${
          showOverlay ? "" : "hidden"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-4 top-4 h-6 w-6 cursor-pointer text-white lg:right-8"
          viewBox="0 0 24 24"
          onClick={() => handleClickHideOverlay()}
        >
          <path
            fill="currentColor"
            d="M14.83 12l5.59-5.59c.54-.54.54-1.41 0-1.95-.54-.54-1.41-.54-1.95 0L12 10.05 6.41 4.46c-.54-.54-1.41-.54-1.95 0-.54.54-.54 1.41 0 1.95L10.05 12l-5.59 5.59c-.54.54-.54 1.41 0 1.95.54.54 1.41.54 1.95 0L12 13.95l5.59 5.59c.54.54 1.41.54 1.95 0 .54-.54.54-1.41 0-1.95L13.95 12z"
          />
        </svg>

        <button onClick={() => handleClickNextImage()}>
          <ChevronRightIcon
            className="absolute bottom-1/2 right-20 cursor-pointer"
            width={30}
            height={30}
            color="white"
          />
        </button>

        <button onClick={() => handleClickPreviousImage()}>
          <ChevronLeftIcon
            className="absolute bottom-1/2 left-20 cursor-pointer"
            width={30}
            height={30}
            color="white"
          />
        </button>

        <Image
          src={photos[selectedImageIndex] ?? ""}
          alt={`Photo ${selectedImageIndex + 1} of ${photos.length}`}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          width={800}
          height={800}
        />

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-inter text-xl text-white">
          Photo {selectedImageIndex + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
};

export default ExpImageCarousel;
