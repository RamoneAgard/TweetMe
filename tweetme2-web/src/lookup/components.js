//import React from 'react';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;
  if (data) {
    jsonData = JSON.stringify(data)
  }
  const xhttp = new XMLHttpRequest();
  const url = `http://localhost:8000/api${endpoint}`;
  const responseType = 'json';
  xhttp.open(method, url);
  xhttp.responseType = responseType;
  // for csrf token
  const csrftoken = getCookie('csrftoken')
  xhttp.setRequestHeader("Content-Type", "application/json");
  if (csrftoken) {
    //xhttp.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('X-CSRFToken', csrftoken);
  }

  xhttp.onload = function () {
    //console.log(xhttp.response, xhttp.status)
    if(xhttp.status === 403){
      const detail = xhttp.response.detail
      if (detail === "Authentication credentials were not provided."){
        if(window.location.href.indexOf("login") === -1) {
          window.location.href = "/login?showLoginRequired=true"
        }
      }
    }
    callback(xhttp.response, xhttp.status)
  }
  xhttp.onerror = function (e) {
    console.log(e)
    callback({ 'message': "The request was an error" }, 400)
  }

  xhttp.send(jsonData)
}

