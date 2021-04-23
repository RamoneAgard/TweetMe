import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

//pulls tweets from backend api endpoint and display on page 
function loadTweets(callback) {
  var xhttp = new XMLHttpRequest();
  const method = 'GET';
  const url = 'http://localhost:8000/api/tweets';
  const responseType = 'json';

  xhttp.onload = function() {
      callback(xhttp.response, xhttp.status)
  }
  xhttp.onerror = function(e) {
    console.log(e)
    callback({'message': "The request was and error"}, 400)
  }
  xhttp.open(method, url);
  xhttp.responseType = responseType;
  xhttp.send()
}


function App() {
  const [tweets, setTweets] = useState([])
  // const performLookup = () => {
  // }
  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if(status === 200){
        setTweets(response)
      }
      else {
        setTweets([])
      }
      
    }

    loadTweets(myCallback)
    
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {tweets.map((tweet, index) => {
            return <li>{tweet.content} </li>
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
