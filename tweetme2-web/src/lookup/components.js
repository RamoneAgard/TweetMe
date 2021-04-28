//import React from 'react';

export function loadTweets(callback) {
  var xhttp = new XMLHttpRequest();
  const method = 'GET';
  const url = 'http://localhost:8000/api/tweets/';
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