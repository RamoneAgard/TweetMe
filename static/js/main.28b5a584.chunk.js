(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(6),r=n.n(s),o=(n(14),n.p+"static/media/logo.6ce24c58.svg"),i=(n(15),n(9)),l=n(3),d=n(2);function u(e,t,n,c){var a;c&&(a=JSON.stringify(c));var s=new XMLHttpRequest,r="http://localhost:8000/api".concat(t);s.open(e,r),s.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");s.setRequestHeader("Content-Type","application/json"),o&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",o)),s.onload=function(){403===s.status&&("Authentication credentials were not provided."===s.response.detail&&(window.location.href="/login?showLoginRequired=true"));n(s.response,s.status)},s.onerror=function(e){console.log(e),n({message:"The request was an error"},400)},s.send(a)}var j=n(8),b=n(0);function m(e){var t=e.tweet,n=e.action,c=e.didPerformAction,a=t.likes?t.likes:0,s=e.className?e.className:"btn btn-primary btn-sm",r=n.display?n.display:"Action",o=function(e,t){console.log(e,t),200!==t&&201!==t||!c||c(e,t)},i="like"===n.type?"".concat(a," ").concat(r):r;return Object(b.jsx)("button",{className:s,onClick:function(e){e.preventDefault(),function(e,t,n){u("POST","/tweets/action/",n,{id:e,action:t})}(t.id,n.type,o)},children:i})}function f(e){var t=e.tweet;return t.parent?Object(b.jsx)("div",{className:"row px-0",children:Object(b.jsxs)("div",{className:"col-11 mx-auto p-3 border rounded",children:[Object(b.jsx)("p",{className:"text-muted small mb-0",children:"Retweet"}),Object(b.jsx)(p,{tweet:t.parent,hideActions:!0,className:"col-12 px-0"})]})}):null}function p(e){var t=e.tweet,n=e.didRetweet,s=e.hideActions,r=Object(c.useState)(e.tweet?e.tweet:null),o=Object(d.a)(r,2),i=o[0],l=o[1],u=e.className?e.className:"col-12 col-md-9 mb-4 py-3 border rounded mx-auto",p=window.location.pathname,w=Object(j.a)(/([0-9]+)/,{tweetid:1}),O=p.match(w),h=O?O.groups.tweetid:-1,v="".concat(t.id)==="".concat(h),x=function(e,t){200===t?l(e):201===t&&n&&n(e)};return Object(b.jsxs)("div",{className:u,children:[Object(b.jsxs)("div",{children:[Object(b.jsxs)("p",{children:[t.id," - ",t.content]}),Object(b.jsx)(f,{tweet:t})]}),Object(b.jsxs)("div",{className:"btn btn-group",children:[i&&!0!==s&&Object(b.jsxs)(a.a.Fragment,{children:[Object(b.jsx)(m,{tweet:i,didPerformAction:x,action:{type:"like",display:"Likes"}}),Object(b.jsx)(m,{tweet:i,didPerformAction:x,action:{type:"unlike",display:"Unlike"}}),Object(b.jsx)(m,{tweet:i,didPerformAction:x,action:{type:"retweet",display:"Retweet"}})]}),!0===v?null:Object(b.jsx)("button",{onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)},className:"btn btn-outline-primary btn-sm",children:"View"})]})]})}function w(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),a=n[0],s=n[1],r=Object(c.useState)([]),o=Object(d.a)(r,2),i=o[0],j=o[1],m=Object(c.useState)(!1),f=Object(d.a)(m,2),w=f[0],O=f[1];Object(c.useEffect)((function(){var t=Object(l.a)(e.newTweets).concat(a);t.length!==i.length&&j(t)}),[e.newTweets,a,i]);var h=function(e,t){200===t?(s(e),O(!0)):alert("There was an error")};Object(c.useEffect)((function(){!1===w&&function(e,t){var n="/tweets/";e&&(n="/tweets/?username=".concat(e)),u("GET",n,t)}(e.username,h)}),[s,w,O,e.username]);var v=function(e){var t=Object(l.a)(a);t.unshift(e),s(t);var n=Object(l.a)(i);n.unshift(i),j(n)};return Object(b.jsx)("div",{className:"p-2",children:i.map((function(e,t){return Object(b.jsx)(p,{tweet:e,didRetweet:v,className:"my-5 p-3 border rounded bg-white text-dark"},"".concat(t,"-").concat(e.id))}))})}function O(e){var t=a.a.createRef(),n=e.didTweet,c=function(e,t){201===t?n(e):(console.log(e),alert("There was an error that occured"))};return Object(b.jsx)("div",{className:e.className,children:Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value;u("POST","/tweets/create/",c,{content:n}),console.log(n),t.current.value=""},children:[Object(b.jsx)("textarea",{ref:t,className:"form-control",name:"tweet",required:!0}),Object(b.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})})}function h(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),a=n[0],s=n[1],r="false"!==e.canTweet;return Object(b.jsxs)("div",{className:e.className,children:[!0===r&&Object(b.jsx)(O,{didTweet:function(e){var t=Object(l.a)(a);t.unshift(e),s(t)},className:"col-12 mb-3"}),Object(b.jsx)(w,Object(i.a)({newTweets:a},e))]})}function v(e){var t=e.tweetId,n=Object(c.useState)(!1),a=Object(d.a)(n,2),s=a[0],r=a[1],o=Object(c.useState)(null),i=Object(d.a)(o,2),l=i[0],j=i[1],m=function(e,t){200===t?j(e):(console.log(e),alert("There was and error finding that tweet"))};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){u("GET","/tweets/".concat(e,"/"),t)}(t,m),r(!0))}),[s,r,t]),null===l?null:Object(b.jsx)(p,{tweet:l,className:e.className})}var x=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("header",{className:"App-header",children:[Object(b.jsx)("img",{src:o,className:"App-logo",alt:"logo"}),Object(b.jsxs)("p",{children:["Edit ",Object(b.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(b.jsx)(h,{}),Object(b.jsx)("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})]})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))},N=document.getElementById("root");N&&r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(x,{})}),N);var y=a.a.createElement,k=document.getElementById("tweetme-2");if(k){var T=y(h,k.dataset);r.a.render(T,k)}document.querySelectorAll(".tweetme-2-detail").forEach((function(e){r.a.render(y(v,e.dataset),e)})),g()}},[[17,1,2]]]);
//# sourceMappingURL=main.28b5a584.chunk.js.map