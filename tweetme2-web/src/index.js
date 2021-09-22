import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TweetsComponent, TweetsFeedComponent, TweetDetailComponent} from './tweets'
import reportWebVitals from './reportWebVitals';

const appEl = document.getElementById('root')
if(appEl){
  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  appEl
  );
}

//insert TweetsComponents into DOM element
const e = React.createElement
const tweetsEl = document.getElementById('tweetme-2')
if(tweetsEl){
  //get data set from django template element
  const MyComponent = e(TweetsComponent, tweetsEl.dataset)
  ReactDOM.render(MyComponent, tweetsEl)
  // ReactDOM.render(
  // <React.StrictMode>
  //   <TweetsComponent />
  // </React.StrictMode>,
  // tweetsEl
  // );
}

//insert TweetsComponents into DOM element
const tweetsFeedEl = document.getElementById('tweetme-2-feed')
if(tweetsFeedEl){
  //get data set from django template element
  ReactDOM.render(
    e(TweetsFeedComponent, tweetsFeedEl.dataset), 
    tweetsFeedEl)
  // ReactDOM.render(
  // <React.StrictMode>
  //   <TweetsComponent />
  // </React.StrictMode>,
  // tweetsEl
  // );
}

//insert TweetDetailComponent into DOM element
const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")

tweetDetailElements.forEach(element => {
  ReactDOM.render(e(TweetDetailComponent, element.dataset), element)
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
