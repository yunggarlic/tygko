import React from 'react';

const VideoPlayer = () => {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/j1TzH8PA7qA"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
};

export default VideoPlayer;
