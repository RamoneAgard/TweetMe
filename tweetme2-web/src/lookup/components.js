//import React from 'react';


function lookup(method, endpoint, callback, data) {
  let jsonData;
  if(data){
    jsonData = JSON.stringify(data)
  }
  const xhttp = new XMLHttpRequest();
  //const method = 'GET';
  const url = `http://localhost:8000/api${endpoint}`;
  const responseType = 'json';

  xhttp.onload = function() {
      callback(xhttp.response, xhttp.status)
  }
  xhttp.onerror = function(e) {
    console.log(e)
    callback({'message': "The request was an error"}, 400)
  }
  xhttp.open(method, url);
  xhttp.responseType = responseType;
  xhttp.send(jsonData)
}

export function createTweet(newTweet, callback){
  lookup("POST","/tweets/create/", callback, {content: newTweet})
}
 
export function loadTweets(callback) {
  lookup("GET", "/tweets/", callback)
}