import React, { useState } from 'react';
import { TweetsList } from './list'
import { TweetCreate } from './create'


export function TweetsComponent(props) {
    //set state variables
    console.log(props)
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




