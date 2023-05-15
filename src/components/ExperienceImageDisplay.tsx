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
  }

  const handleClickNextOverlayImage = function () {
    if (overlayImageIndex === photos.length - 1) {
        setOverlayImageIndex(0);
    }
    else {
        setOverlayImageIndex(overlayImageIndex + 1);
    }
  }

  const handleClickPreviousOverlayImage = function () {
    if (overlayImageIndex === 0) {
        setOverlayImageIndex(photos.length - 1);
    }
    else {
        setOverlayImageIndex(overlayImageIndex - 1);
    }
  }

  return (
    <>
      <div className="m-10 grid grid-cols-4 gap-4">
        <div className="flex justify-center items-center col-span-4 overflow-hidden lg:col-span-2 lg:row-span-2 relative">
          <img
            src={photos[0]}
            alt="experience photo"
            className="max-h-96"
          />
          
          <div 
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100"
            onClick={() => handleClickImage(0)}
            >
            <span className="text-lg font-semibold text-white">
              View Larger Image
            </span>
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => {
          return (
            <>
              <div key={i} className={`relative overflow-hidden flex justify-center items-center max-h-48`}>
                {photos[i] && (
                  <>
                    <img
                      src={photos[i]}
                      alt="experience photo"
                      className=""
                    />
                    <div
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity hover:opacity-100"
                      onClick={() => handleClickImage(i)}
                    >
                      <span className="text-lg font-semibold text-white">
                        View Larger Image
                      </span>
                    </div>
                  </>
                )}
                {!photos[i] && <div className="h-full w-full bg-slate-100" />}
              </div>
            </>
          );
        })}
      </div>
      <div className={`fixed inset-0 z-40 h-screen w-screen bg-black bg-opacity-90 ${showOverlay ? "" : "hidden"}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white absolute top-4 right-4 lg:right-8 cursor-pointer" 
          viewBox="0 0 24 24"
          onClick={() => handleClickHideOverlay()}
        >
          <path fill="currentColor" d="M14.83 12l5.59-5.59c.54-.54.54-1.41 0-1.95-.54-.54-1.41-.54-1.95 0L12 10.05 6.41 4.46c-.54-.54-1.41-.54-1.95 0-.54.54-.54 1.41 0 1.95L10.05 12l-5.59 5.59c-.54.54-.54 1.41 0 1.95.54.54 1.41.54 1.95 0L12 13.95l5.59 5.59c.54.54 1.41.54 1.95 0 .54-.54.54-1.41 0-1.95L13.95 12z"/>
        </svg>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white absolute top-3/4 right-20 transform -translate-y-1/2 cursor-pointer lg:top-1/2 lg:right-8" 
            viewBox="0 0 24 24"
            onClick={() => handleClickNextOverlayImage()}
        >
            <path fill="currentColor" d="M8 5v14l11-7z"/>
        </svg>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white absolute top-3/4 left-20 transform -translate-y-1/2 cursor-pointer lg:top-1/2 lg:left-2" 
            viewBox="0 0 24 24"
            onClick={() => handleClickPreviousOverlayImage()}
        >
            <path fill="currentColor" d="M 15 18 v -14 l -11 7 z"/>
        </svg>

        <img src={photos[overlayImageIndex]} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-screen max-h-screen select-none lg:max-w-3xl"/>

        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl text-white">Photo {overlayImageIndex + 1} / {photos.length}</p>
      </div>
    </>
  );
}
