import React, { useEffect, useState } from 'react';
import { loadTweets } from '../lookup'

export function TweetsList(props) {
    const [tweets, setTweets] = useState([])
    // const performLookup = () => {
    // }
    useEffect(() => {
        const myCallback = (response, status) => {
            console.log(response, status)
            if (status === 200) {
                setTweets(response)
            }
            else {
                setTweets([])
            }

        }

        loadTweets(myCallback)

    }, [])

    return <div>
        {tweets.map((item, index) => {
            return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`} />
        })}
    </div>
}

export function Tweet(props) {
    const { tweet } = props
    const className = props.className ? props.className : 'col-12 col-md-9 mb-4 py-3 border rounded mx-auto'
    return <div className={className}>
        <p>{tweet.id} - {tweet.content}</p>
        <div className='btn btn-group'>
            <ActionBtn tweet={tweet} action={{ type: 'like', display: "Likes" }} />
            <ActionBtn tweet={tweet} action={{ type: 'unlike', display: "Unlike" }} />
            <ActionBtn tweet={tweet} action={{ type: 'retweet', display: "Retweet" }} />
        </div>
    </div>
}

export function ActionBtn(props) {
    const { tweet, action } = props
    const className = props.className ?
        props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type === 'like' ?
        `${tweet.likes} ${actionDisplay}` : actionDisplay
    const handleClick = (event) => {
        event.preventDefault()
        if(action.type === 'like'){
            console.log(tweet.likes + 1)
        }
    }
    return <button className={className} onClick={handleClick}>
        {display}
    </button>
}