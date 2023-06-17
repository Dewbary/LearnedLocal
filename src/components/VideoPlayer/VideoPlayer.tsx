import * as React from "react";
import LazyLoad from "react-lazyload";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  return (
    <LazyLoad once offset={100}>
      <YouTube
        className="pt-8 md:pl-16 md:pr-16 md:pt-8 md:pb-8 lg:pl-48 lg:pr-48 lg:pt-16 lg:pb-16"
        videoId="leKfHxT_6II"
      />
    </LazyLoad>
  );
};

export default VideoPlayer;
