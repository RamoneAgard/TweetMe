import React, { useEffect, useState } from 'react';
import { apiTweetFeed } from './lookup'
import { Tweet } from './detail'

export function TweetsFeedList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    const [tweetsDidSet, setTweetsDidSet] = useState(false)

    //combine new and inital tweets
    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length) {
            setTweets(final)
        }
    }, [props.newTweets, tweetsInit, tweets])

    //call for api tweet list response 
    const handleTweetListLookup = (response, status) => {
        //console.log(response, status)
        if (status === 200) {
            setTweetsInit(response.results)
            setNextUrl(response.next)
            setTweetsDidSet(true)
        }
        else {
            alert("There was an error")
        }
    }

    //pull inital tweets
    useEffect(() => {
        if (tweetsDidSet === false) {
            //server side call
            apiTweetFeed(handleTweetListLookup)
        }
    }, [setTweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

    //combine new retweets
    const handleDidRetweet = (newTweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)
        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets)
        setTweets(updateFinalTweets)
    }

    const handleLoadNext = (event) =>{
        event.preventDefault()
        if(nextUrl !== null){
            const handleLoadNextResponse = (response, status) => {
                if (status === 200) {
                    const moreTweets = [...tweets].concat(response.results)
                    setTweetsInit(moreTweets)
                    setTweets(moreTweets)
                    setNextUrl(response.next)
                }
                else {
                    alert("There was an error")
                }
            }
            apiTweetFeed(handleLoadNextResponse, nextUrl)

        }
    }


    return <React.Fragment>
        {tweets.map((item, index) => {
            return <Tweet 
                tweet={item} 
                didRetweet={handleDidRetweet}
                className='my-5 p-3 border rounded bg-white text-dark' 
                key={`${index}-${item.id}`} />
        })}
        {nextUrl !== null && 
            <button 
                className='btn btn-outline-primary'
                onClick = {handleLoadNext}>
                Load Next
            </button>
        }
    </React.Fragment>
}