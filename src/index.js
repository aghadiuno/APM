import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAEl7BVBBdbGxWUm6Lu4G37uhpiMFPBMp8",
  authDomain: "apm-main.firebaseapp.com",
  databaseURL: "https://apm-main.firebaseio.com",
  projectId: "apm-main",
  storageBucket: "apm-main.appspot.com",
  messagingSenderId: "860137382649"
};
firebase.initializeApp(config);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
