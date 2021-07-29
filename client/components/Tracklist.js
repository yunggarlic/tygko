import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parse } from 'node-html-parser';

const Tracklist = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await axios.get('/webscrape');
      setState(data);
    };
    fetchTracks();
  }, []);
  return (
    <div>
      {state.pictureUrls ? (
        state.pictureUrls.map((picture, idx) => {
          return (
            <a href={`http://tygko.bandcamp.com/${state.musicUrls[idx]}`}>
              <img src={picture} />
            </a>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tracklist;
