import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//render function grabs 'react-app' element in HTML and injects App component which contains everything else
ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('react-app')
);
