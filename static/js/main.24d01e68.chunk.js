(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(5),s=n.n(r),o=(n(14),n.p+"static/media/logo.6ce24c58.svg"),i=(n(15),n(8)),l=n(3),u=n(2);function d(e,t,n,c){var a;c&&(a=JSON.stringify(c));var r=new XMLHttpRequest,s="http://localhost:8000/api".concat(t);r.open(e,s),r.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");r.setRequestHeader("Content-Type","application/json"),o&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("X-CSRFToken",o)),r.onload=function(){403===r.status&&("Authentication credentials were not provided."===r.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(r.response,r.status)},r.onerror=function(e){console.log(e),n({message:"The request was an error"},400)},r.send(a)}function j(e,t,n){var c="/tweets/";e&&(c="/tweets/?username=".concat(e)),null!==n&&(c=n.replace("http://localhost:8000/api","")),d("GET",c,t)}function b(e,t){var n="/tweets/feed/";null!==t&&void 0!==t&&(n=t.replace("http://localhost:8000/api","")),d("GET",n,e)}var m=n(9),f=n(0);function O(e){var t=e.tweet,n=e.action,c=e.didPerformAction,a=t.likes?t.likes:0,r=e.className?e.className:"btn btn-primary btn-sm",s=n.display?n.display:"Action",o=function(e,t){console.log(e,t),200!==t&&201!==t||!c||c(e,t)},i="like"===n.type?"".concat(a," ").concat(s):s;return Object(f.jsx)("button",{className:r,onClick:function(e){e.preventDefault(),function(e,t,n){d("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,o)},children:i})}function w(e){var t=e.username;return Object(f.jsx)("span",{className:"pointer",onClick:function(e){window.location.href="/profile/".concat(t)},children:e.children})}function h(e){var t=e.user,n=!0===e.includeFullName?"".concat(t.first_name," ").concat(t.last_name," "):null;return Object(f.jsxs)(a.a.Fragment,{children:[n,Object(f.jsxs)(w,{username:t.username,children:["@",t.username]})]})}function p(e){var t=e.user;return Object(f.jsx)(w,{username:t.username,children:Object(f.jsx)("span",{className:"mx-1 px-3 py-2 rounded-circle bg-dark text-white",children:t.username[0]})})}function x(e){var t=e.tweet;return t.parent?Object(f.jsx)(v,{tweet:t.parent,retweeter:e.retweeter,isRetweet:!0,hideActions:!0,className:"col-12 px-0"}):null}function v(e){var t=e.tweet,n=e.didRetweet,r=e.hideActions,s=e.isRetweet,o=e.retweeter,i=Object(c.useState)(e.tweet?e.tweet:null),l=Object(u.a)(i,2),d=l[0],j=l[1],b=e.className?e.className:"col-12 col-md-9 mb-4 py-3 border rounded mx-auto";b=!0===s?"".concat(b," border rounded p-2"):b;var w=window.location.pathname,v=Object(m.a)(/([0-9]+)/,{tweetid:1}),g=w.match(v),N=g?g.groups.tweetid:-1,T="".concat(t.id)==="".concat(N),y=function(e,t){200===t?j(e):201===t&&n&&n(e)};return Object(f.jsxs)("div",{className:b,children:[!0===s&&Object(f.jsx)("div",{className:"mb-2",children:Object(f.jsxs)("span",{className:"text-muted small p-0",children:["Retweet via ",Object(f.jsx)(h,{user:o})]})}),Object(f.jsxs)("div",{className:"d-flex",children:[Object(f.jsx)("div",{className:"",children:Object(f.jsx)(p,{user:t.user})}),Object(f.jsxs)("div",{className:"col-11",children:[Object(f.jsxs)("div",{children:[Object(f.jsx)("p",{children:Object(f.jsx)(h,{user:t.user,includeFullName:!0})}),Object(f.jsx)("p",{children:t.content}),Object(f.jsx)(x,{tweet:t,retweeter:t.user})]}),Object(f.jsxs)("div",{className:"btn btn-group px-0",children:[d&&!0!==r&&Object(f.jsxs)(a.a.Fragment,{children:[Object(f.jsx)(O,{tweet:d,didPerformAction:y,action:{type:"like",display:"Likes"}}),Object(f.jsx)(O,{tweet:d,didPerformAction:y,action:{type:"unlike",display:"Unlike"}}),Object(f.jsx)(O,{tweet:d,didPerformAction:y,action:{type:"retweet",display:"Retweet"}})]}),!0===T?null:Object(f.jsx)("button",{onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)},className:"btn btn-outline-primary btn-sm",children:"View"})]})]})]})]})}function g(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),r=n[0],s=n[1],o=Object(c.useState)([]),i=Object(u.a)(o,2),d=i[0],b=i[1],m=Object(c.useState)(null),O=Object(u.a)(m,2),w=O[0],h=O[1],p=Object(c.useState)(!1),x=Object(u.a)(p,2),g=x[0],N=x[1];Object(c.useEffect)((function(){var t=Object(l.a)(e.newTweets).concat(r);t.length!==d.length&&b(t)}),[e.newTweets,r,d]);var T=function(e,t){200===t?(s(e.results),h(e.next),N(!0)):alert("There was an error")};Object(c.useEffect)((function(){!1===g&&j(e.username,T,null)}),[s,g,N,e.username]);var y=function(e){var t=Object(l.a)(r);t.unshift(e),s(t);var n=Object(l.a)(d);n.unshift(d),b(n)};return Object(f.jsxs)(a.a.Fragment,{children:[d.map((function(e,t){return Object(f.jsx)(v,{tweet:e,didRetweet:y,className:"my-5 p-3 border rounded bg-white text-dark"},"".concat(t,"-").concat(e.id))})),null!==w&&Object(f.jsx)("button",{className:"btn btn-outline-primary",onClick:function(t){if(t.preventDefault(),null!==w){j(e.username,(function(e,t){if(200===t){var n=Object(l.a)(d).concat(e.results);s(n),b(n),h(e.next)}else alert("There was an error")}),w)}},children:"Load Next"})]})}function N(e){var t=a.a.createRef(),n=e.didTweet,c=function(e,t){201===t?n(e):(console.log(e),alert("There was an error that occured"))};return Object(f.jsx)("div",{className:e.className,children:Object(f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;d("POST","/tweets/create/",c,{content:n}),console.log(n),t.current.value=""},children:[Object(f.jsx)("textarea",{ref:t,className:"form-control",name:"tweet",required:!0}),Object(f.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})})}function T(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),r=n[0],s=n[1],o=Object(c.useState)([]),i=Object(u.a)(o,2),d=i[0],j=i[1],m=Object(c.useState)(null),O=Object(u.a)(m,2),w=O[0],h=O[1],p=Object(c.useState)(!1),x=Object(u.a)(p,2),g=x[0],N=x[1];Object(c.useEffect)((function(){var t=Object(l.a)(e.newTweets).concat(r);t.length!==d.length&&j(t)}),[e.newTweets,r,d]);var T=function(e,t){200===t?(s(e.results),h(e.next),N(!0)):alert("There was an error")};Object(c.useEffect)((function(){!1===g&&b(T)}),[s,g,N,e.username]);var y=function(e){var t=Object(l.a)(r);t.unshift(e),s(t);var n=Object(l.a)(d);n.unshift(d),j(n)};return Object(f.jsxs)(a.a.Fragment,{children:[d.map((function(e,t){return Object(f.jsx)(v,{tweet:e,didRetweet:y,className:"my-5 p-3 border rounded bg-white text-dark"},"".concat(t,"-").concat(e.id))})),null!==w&&Object(f.jsx)("button",{className:"btn btn-outline-primary",onClick:function(e){if(e.preventDefault(),null!==w){b((function(e,t){if(200===t){var n=Object(l.a)(d).concat(e.results);s(n),j(n),h(e.next)}else alert("There was an error")}),w)}},children:"Load Next"})]})}function y(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],r=n[1],s="false"!==e.canTweet;return Object(f.jsxs)("div",{className:e.className,children:[!0===s&&Object(f.jsx)(N,{didTweet:function(e){var t=Object(l.a)(a);t.unshift(e),r(t)},className:"col-12 mb-3"}),Object(f.jsx)(g,Object(i.a)({newTweets:a},e))]})}function k(e){var t=e.tweetId,n=Object(c.useState)(!1),a=Object(u.a)(n,2),r=a[0],s=a[1],o=Object(c.useState)(null),i=Object(u.a)(o,2),l=i[0],j=i[1],b=function(e,t){200===t?j(e):(console.log(e),alert("There was and error finding that tweet"))};return Object(c.useEffect)((function(){!1===r&&(!function(e,t){d("GET","/tweets/".concat(e,"/"),t)}(t,b),s(!0))}),[r,s,t]),null===l?null:Object(f.jsx)(v,{tweet:l,className:e.className})}var S=function(){return Object(f.jsx)("div",{className:"App",children:Object(f.jsxs)("header",{className:"App-header",children:[Object(f.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(f.jsxs)("p",{children:["Edit ",Object(f.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(f.jsx)(y,{}),Object(f.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),c(e),a(e),r(e),s(e)}))},A=document.getElementById("root");A&&s.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(S,{})}),A);var E=a.a.createElement,C=document.getElementById("tweetme-2");if(C){var F=E(y,C.dataset);s.a.render(F,C)}var q=document.getElementById("tweetme-2-feed");q&&s.a.render(E((function(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],r=n[1],s="false"!==e.canTweet;return Object(f.jsxs)("div",{className:e.className,children:[!0===s&&Object(f.jsx)(N,{didTweet:function(e){var t=Object(l.a)(a);t.unshift(e),r(t)},className:"col-12 mb-3"}),Object(f.jsx)(T,Object(i.a)({newTweets:a},e))]})}),q.dataset),q),document.querySelectorAll(".tweetme-2-detail").forEach((function(e){s.a.render(E(k,e.dataset),e)})),R()}},[[17,1,2]]]);
//# sourceMappingURL=main.24d01e68.chunk.js.map