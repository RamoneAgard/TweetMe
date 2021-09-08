import React, { useEffect, useState } from 'react';
import { apiTweetList } from './lookup'
import { Tweet } from './detail'


export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
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
        console.log(response, status)
        if (status === 200) {
            setTweetsInit(response)
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
            apiTweetList(props.username, handleTweetListLookup)
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

    return <div className='p-2'>
        {tweets.map((item, index) => {
            return <Tweet 
                tweet={item} 
                didRetweet={handleDidRetweet}
                className='my-5 p-3 border rounded bg-white text-dark' 
                key={`${index}-${item.id}`} />
        })}
    </div>
}