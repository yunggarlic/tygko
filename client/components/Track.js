import React, { useState } from 'react';

const Track = (props) => {
  const { title, url } = props;
  return (
    <>
      <a href={`http://tygko.bandcamp.com${url}`}>{`${title}`}</a>
    </>
  );
};

export default Track;
