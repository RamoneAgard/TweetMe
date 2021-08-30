import React, { useEffect, useState } from 'react';
import { loadTweets, createTweet } from '../lookup'


export function TweetsComponent(props) {
    //set state variables
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()

    //new tweet handler
    const handleSubmit = (event) => {
        event.preventDefault()
        const newT = textAreaRef.current.value
        let tempNewTweets = [...newTweets]
        //server side call
        createTweet(newT, (response, status) => {
            if(status === 201){
                tempNewTweets.unshift(response)
                setNewTweets(tempNewTweets)
            }
            else{
                console.log(response)
                alert("There was an error that occured")
            }
        })
        // tempNewTweets.unshift({
        //     content: newT,
        //     likes: 0,
        //     id: 15
        // })
        console.log(newT)
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} className='form-control' name='tweet' required={true}>
                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        <TweetsList newTweets={newTweets}/>
    </div>

}

export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([]) 
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)
    // const performLookup = () => {
    // }
    
    //combine new and inital tweets
    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit)
        if(final.length !== tweets.length){
            setTweets(final)
        }
    }, [props.newTweets, tweetsInit, tweets]) 

    //pull inital tweets
    useEffect(() => {
        if (tweetsDidSet === false) {
            const myCallback = (response, status) => {
                console.log(response, status)
                if (status === 200) {
                    setTweetsInit(response)
                    setTweetsDidSet(true)
                }
                else {
                    alert("There was an error")
                }
            }
            loadTweets(myCallback)
        }
    }, [setTweetsInit, tweetsDidSet, setTweetsDidSet])

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
            {/* <ActionBtn tweet={tweet} action={{ type: 'unlike', display: "Unlike" }} /> */}
            <ActionBtn tweet={tweet} action={{ type: 'retweet', display: "Retweet" }} />
        </div>
    </div>
}

export function ActionBtn(props) {
    const { tweet, action } = props
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type === 'like' ?
        `${tweet.likes} ${actionDisplay}` : actionDisplay

    //handle like button
    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'like') {
            if (userLike === true) {
                //unlike if already liked 
                setLikes(likes - 1)
                setUserLike(false)
            }
            else {
                setLikes(likes + 1)
                setUserLike(true)
            }
        }
    }
    return <button className={className} onClick={handleClick}>
        {display}
    </button>
}