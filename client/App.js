import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tracklist from './components/Tracklist';
import VideoPlayer from './components/VideoPlayer';
import SocialLinks from './components/SocialLinks';
import MusicLinks from './components/MusicLinks';
import Copyright from './components/Copyright';
import ThreeScene from './components/threeScene/ThreeScene';

export default function App() {
  const [state, setState] = useState({});
  const [loaded, toggleLoaded] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await axios.get('/webscrape');
      setState(data);
      toggleLoaded(true);
    };
    fetchTracks();
  }, []);

  return (
    <div className="main">
      {loaded ? (
        <>
          <h1 style={{ fontSize: '3.052em' }}>TYGKO</h1>
          <MusicLinks />
          <VideoPlayer />
          <Tracklist state={state} />
          <SocialLinks />
          <Copyright />
          <div className="scene">
            <ThreeScene />
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
