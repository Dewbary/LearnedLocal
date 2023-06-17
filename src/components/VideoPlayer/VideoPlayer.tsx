import * as React from "react";
import LazyLoad from "react-lazyload";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  return (
    <div className="aspect-w-16 aspect-h-9 w-full">
      <iframe
        src="https://www.youtube.com/embed/leKfHxT_6II"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
