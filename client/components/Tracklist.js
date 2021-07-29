import React, { useEffect, useState } from 'react';
import Track from './Track';

const Tracklist = (props) => {
  const { state } = props;
  const [visibility, toggleVisibility] = useState(false);
  const [selectIdx, setIdx] = useState(0);

  const mouseEnter = (idx) => {
    setIdx(idx);
    toggleVisibility(true);
  };
  const mouseOut = () => {
    toggleVisibility(false);
  };

  return (
    <div className="release-list">
      <div className="tracks-list">
        {state.titles ? (
          state.titles.map((title, idx) => {
            return (
              <div
                className="track"
                idx={idx}
                onMouseEnter={() => mouseEnter(idx)}
                onMouseOut={() => mouseOut()}
              >
                <Track
                  key={idx}
                  idx={idx}
                  title={title}
                  picture={state.pictures[idx]}
                  url={state.musicUrls[idx]}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
      <img
        className="track-picture"
        idx={selectIdx}
        src={state.pictures[selectIdx]}
        alt={state.title}
        width="250px"
        style={{
          visibility: visibility ? 'visible' : 'hidden',
          zIndex: -1,
          display: 'inline',
        }}
      />
    </div>
  );
};

export default Tracklist;
