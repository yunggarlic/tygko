import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from './components/Content';
import Footer from './components/Footer';
import ThreeScene from './components/threeScene/ThreeScene';
import Header from './components/Header';
import '../public/style.less';

export default function App() {
  const [state, setState] = useState({});
  const [loaded, toggleLoaded] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      const { data } = await axios.get('/musicData');
      setState(data);
      toggleLoaded(true);
    };
    fetchTracks();
  }, []);

  return (
    <div className="main">
      {loaded ? (
        <>
          <div class="loaded-content">
            <Header />
            <Content state={state} />
            <Footer />
          </div>
          <ThreeScene />
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
