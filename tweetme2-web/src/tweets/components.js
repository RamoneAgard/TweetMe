import React, { useEffect, useState } from 'react';
import { TweetsList } from './list'
import { TweetCreate } from './create'
import { Tweet } from './detail'
import { TweetsFeedList } from './feed';
import { apiTweetDetail } from './lookup'


export function TweetsComponent(props) {
    //set state variables
    //console.log(props)
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    //callback for api response update
    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }

    return <div className={props.className}>
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/>}
        <TweetsList newTweets={newTweets} {...props} />
    </div>

}

export function TweetsFeedComponent(props) {
    //set state variables
    //console.log(props)
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    //callback for api response update
    const handleNewTweet = (newTweet) => {
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }

    return <div className={props.className}>
        {canTweet === true && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/>}
        <TweetsFeedList newTweets={newTweets} {...props} />
    </div>

}


export function TweetDetailComponent(props) {
    const {tweetId} = props 
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)

    //callback for tweet detail lookup
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setTweet(response)
        } else {
            console.log(response)
            alert("There was and error finding that tweet")
        }
    }

    //perform backend lookup on creation
    useEffect(() => {
        if(didLookup === false){
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [didLookup, setDidLookup, tweetId])

    return tweet === null ? null :
        <Tweet
            tweet={tweet}
            className={props.className}
        />
}




