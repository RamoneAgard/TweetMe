import React from 'react';
import { apiTweetCreate } from './lookup'


export function TweetCreate(props) {
    //set state variables
    const textAreaRef = React.createRef()
    const {didTweet} = props

    //callback for api response update
    const handleBackendCreateUpdate = (response, status) => {
        if (status === 201) {
            didTweet(response)
        }
        else {
            console.log(response)
            alert("There was an error that occured")
        }
    }

    //new tweet handler
    const handleSubmit = (event) => {
        event.preventDefault()
        const newT = textAreaRef.current.value

        //server side call
        apiTweetCreate(newT, handleBackendCreateUpdate)
        console.log(newT)
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        <form onSubmit={handleSubmit}>
            <textarea ref={textAreaRef} className='form-control' name='tweet' required={true}>
            </textarea>
            <button type='submit' className='btn btn-primary my-3'>Tweet</button>
        </form>
    </div>
}