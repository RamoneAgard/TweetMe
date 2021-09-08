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
    const path = window.location.pathname
    var idRegex = /(?<tweetid>\d+)/
    var match = path.match(idRegex)
    const urlTweetId = match ? match.groups.tweetid : -1
    const isDetail = `${tweet.id}` === `${urlTweetId}`
    
    //handle update after action button is used
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {
            setActionTweet(newActionTweet)
        } else if (status === 201 && didRetweet) {
            // get new tweet and let tweetList know of change
            didRetweet(newActionTweet)
        }
    }

    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${tweet.id}`

    } 

    return <div className={className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        <div className='btn btn-group'>
            {(actionTweet && hideActions !== true) && <React.Fragment>
                <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', display: "Likes" }} />
                <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', display: "Unlike" }} />
                <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', display: "Retweet" }} />
            </React.Fragment>}
            {isDetail === true ? null : 
                <button onClick={handleLink} className='btn btn-outline-primary btn-sm'>View</button>
            }
        </div>
    </div>
}