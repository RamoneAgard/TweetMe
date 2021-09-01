import React, { useState } from 'react';
import { ActionBtn } from './buttons'


export function ParentTweet(props) {
    const {tweet} = props
    return tweet.parent ? <div className='row px-0'>
        <div className='col-11 mx-auto p-3 border rounded'>
            <p className='text-muted small mb-0'>Retweet</p>
            <Tweet tweet={tweet.parent} hideActions className={'col-12 px-0'} />
        </div>
    </div> : null
}

export function Tweet(props) {
    const { tweet, didRetweet, hideActions } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-12 col-md-9 mb-4 py-3 border rounded mx-auto'
    
    //handle update after action button is used
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {
            setActionTweet(newActionTweet)
        } else if (status === 201 && didRetweet) {
            didRetweet(newActionTweet)
            // get new tweet and let tweetList know of change
        }
    }

    return <div className={className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        {(actionTweet && hideActions !== true) && <div className='btn btn-group'>
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', display: "Likes" }} />
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', display: "Unlike" }} />
            <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', display: "Retweet" }} />
        </div>}
    </div>
}