import React from 'react';
import Tracklist from './Tracklist';
import VideoPlayer from './VideoPlayer';

const Content = (props) => {
  const { state } = props;
  return (
    <div>
      <VideoPlayer />
      <Tracklist state={state} />
    </div>
  );
};

export default Content;
