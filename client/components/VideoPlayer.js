import React from 'react';

const VideoPlayer = () => {
  return (
    <iframe
      className="video-player"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/j1TzH8PA7qA"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
