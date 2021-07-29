import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThreeScene from './components/threeScene/ThreeScene';

//render function grabs 'react-app' element in HTML and injects App component which contains everything else
ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('react-app')
);
