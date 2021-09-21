import React, { useState } from 'react';
import { ActionBtn } from './buttons'
import {UserDisplay, UserPicture} from '../profiles'

export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent ?
        <Tweet
            tweet={tweet.parent}
            retweeter={props.retweeter}
            isRetweet
            hideActions
            className={'col-12 px-0'} /> : null
}

export function Tweet(props) {
    const { tweet, didRetweet, hideActions, isRetweet, retweeter } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    let className = props.className ? props.className : 'col-12 col-md-9 mb-4 py-3 border rounded mx-auto'
    className = isRetweet === true ? `${className} border rounded p-2` : className
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
        {isRetweet === true && <div className='mb-2'>
            <span className='text-muted small p-0'>Retweet via <UserDisplay user={retweeter}/></span>
        </div>}
        <div className='d-flex'>
            <div className=''>
                <UserPicture user={tweet.user}/>
            </div>
            <div className='col-11'>
                <div>
                    <p>
                        <UserDisplay user={tweet.user} includeFullName/>
                    </p>
                    <p>
                        {tweet.content}
                    </p>
                    <ParentTweet tweet={tweet} retweeter={tweet.user} />
                </div>
                <div className='btn btn-group px-0'>
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
        </div>
    </div>
}