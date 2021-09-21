import {backendLookup} from '../lookup'

export function apiTweetCreate(newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, { content: newTweet })
}

export function apiTweetAction(tweetId, action, callback) {
    const data = {id: tweetId, action: action}
    backendLookup("POST", "/tweets/action/", callback, data)
}

export function apiTweetList(username, callback, nextUrl) {
    let endpoint = "/tweets/"
    if (username) {
        endpoint = `/tweets/?username=${username}`
    }
    if(nextUrl !== null){
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiTweetDetail(tweetId, callback) {
    let endpoint = `/tweets/${tweetId}/`
    backendLookup("GET", endpoint, callback)
}