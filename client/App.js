import React from 'react';
import Tracklist from './components/Tracklist';

export default function App() {
  return (
    <>
      <h1>TYGKO</h1>
      <h2>Links</h2>
      <ul>
        <li>SHOP</li>
        <li>LINKS</li>
      </ul>
      <h2>Video embedded</h2>
      <h3>Links</h3>
      <ul>
        <li>
          <a href="https://tygko.bandcamp.com/">Bandcamp</a>
        </li>
        <li>Spotify</li>
        <li>
          <a href="https://twitter.com/TYG_KO">Twitter</a>
        </li>
      </ul>
      <Tracklist />
      <ul>
        <li>Song 1</li>
        <li>Song 2</li>
        <li>Song 3</li>
      </ul>
      <h4>Internal Links</h4>
      <ul>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </>
  );
}
