import Image from "next/image";
import { useState } from "react";

type Props = {
  photos: string[];
};

export default function ExperienceImageDisplay({ photos }: Props) {
  const [overlayImageIndex, setOverlayImageIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClickImage = function (imageIndex: number) {
    setShowOverlay(true);
    setOverlayImageIndex(imageIndex);
  };

  const handleClickHideOverlay = function () {
    setShowOverlay(false);
  };

  const handleClickNextOverlayImage = function () {
    if (overlayImageIndex === photos.length - 1) {
      setOverlayImageIndex(0);
    } else {
      setOverlayImageIndex(overlayImageIndex + 1);
    }
  };

  const handleClickPreviousOverlayImage = function () {
    if (overlayImageIndex === 0) {
      setOverlayImageIndex(photos.length - 1);
    } else {
      setOverlayImageIndex(overlayImageIndex - 1);
    }
  };

  return (
    <>
      <div className="m-10 grid grid-cols-4 gap-4">
        <div className="relative col-span-4 flex h-96 items-center justify-center overflow-hidden lg:col-span-2 lg:row-span-2">
          <Image
            src={photos[0] ?? ""}
            alt="experience photo"
            className="max-h-96 object-contain"
            onClick={() => handleClickImage(0)}
            fill
          />

          <div
            className="absolute inset-0 hidden cursor-pointer items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 lg:flex"
            onClick={() => handleClickImage(0)}
          >
            <span className="text-lg font-semibold text-white">
              View Larger Image
            </span>
          </div>
        </div>
        {[1, 2, 3, 4].map((i, index) => {
          return (
            <>
              <div
                key={index}
                className={`relative flex h-24 items-center justify-center overflow-hidden md:h-48`}
              >
                {photos[i] && (
                  <>
                    <Image
                      src={photos[i] ?? ""}
                      alt="experience photo"
                      className="max-h-48 object-cover"
                      onClick={() => handleClickImage(i)}
                      fill
                    />
                    <div
                      className="absolute inset-0 hidden cursor-pointer items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100 lg:flex"
                      onClick={() => handleClickImage(i)}
                    >
                      <span className="text-center text-lg font-semibold text-white">
                        View Larger Image
                      </span>
                    </div>
                  </>
                )}
                {!photos[i] && <div className="h-full w-full bg-white" />}
              </div>
            </>
          );
        })}
      </div>
      <div
        className={`fixed inset-0 z-40 h-screen w-screen bg-black bg-opacity-90 ${
          showOverlay ? "" : "hidden"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer text-white lg:right-8"
          viewBox="0 0 24 24"
          onClick={() => handleClickHideOverlay()}
        >
          <path
            fill="currentColor"
            d="M14.83 12l5.59-5.59c.54-.54.54-1.41 0-1.95-.54-.54-1.41-.54-1.95 0L12 10.05 6.41 4.46c-.54-.54-1.41-.54-1.95 0-.54.54-.54 1.41 0 1.95L10.05 12l-5.59 5.59c-.54.54-.54 1.41 0 1.95.54.54 1.41.54 1.95 0L12 13.95l5.59 5.59c.54.54 1.41.54 1.95 0 .54-.54.54-1.41 0-1.95L13.95 12z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-4 right-20 h-6 w-6 cursor-pointer text-white"
          viewBox="0 0 24 24"
          onClick={() => handleClickNextOverlayImage()}
        >
          <path fill="currentColor" d="M8 5v14l11-7z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-4 left-20 h-6 w-6 cursor-pointer text-white"
          viewBox="0 0 24 24"
          onClick={() => handleClickPreviousOverlayImage()}
        >
          <path fill="currentColor" d="M 15 18 v -14 l -11 7 z" />
        </svg>

        <Image
          src={photos[overlayImageIndex] ?? ""}
          alt={`Photo ${overlayImageIndex + 1} of ${photos.length}`}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          width={800}
          height={800}
        />

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl text-white">
          Photo {overlayImageIndex + 1} / {photos.length}
        </p>
      </div>
    </>
  );
}
