import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCX5D729FTdk4BtGj8JZyXAs_2BMTlfii0",
  authDomain: "web-first-e184e.firebaseapp.com",
  databaseURL: "https://web-first-e184e.firebaseio.com",
  projectId: "web-first-e184e",
  storageBucket: "web-first-e184e.appspot.com",
  messagingSenderId: "711167829507"
};
firebase.initializeApp(config);
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
