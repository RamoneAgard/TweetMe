import React, { useEffect, useState } from "react"
import { DisplayCount } from "./utils"
import { apiProfileDetail, apiProfileFollowToggle } from './lookup'
import { UserDisplay, UserPicture } from './components'


function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props
    //console.log(user)
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading..." : currentVerb

    //Use passed callback for follow/unfollow request 
    const handleFollowToggle = (event) =>{
        event.preventDefault()
        if(didFollowToggle && !profileLoading){
            didFollowToggle(currentVerb)
        }
    }

    return user ? <div className='m-2'>
        <UserPicture user={user} hideLink />
        <p><UserDisplay user={user} includeFullName hideLink /></p>
        <p><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? "Follower" : "Followers"}</p>
        <p>Following <DisplayCount>{user.following_count}</DisplayCount></p>
        <p>Location: {user.location}</p>
        <p>{user.bio}</p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>
            {currentVerb}
        </button>
    </div> : null
}


export function ProfileBadgeComponent(props){
    const {username} = props 

    //lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

    //callback for tweet detail lookup
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        } else {
            console.log(response)
            alert("There was and error finding that user profile")
        }
    }

    //perform backend lookup on creation
    useEffect(() => {
        if(didLookup === false){
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [didLookup, setDidLookup, username])

    //handles the follow button request and response
    const handleFollowAction = (actionVerb) =>{
        setProfileLoading(true)
        const followToggleCallback = (response, status) =>{
            //console.log(response)
            if(status === 200){
                setProfile(response)
            }
            setProfileLoading(false)
        }
        apiProfileFollowToggle(username, actionVerb, followToggleCallback)
    }

    return didLookup === false ? "Loading" : profile ? 
    <ProfileBadge user={profile} didFollowToggle={handleFollowAction} profileLoading={profileLoading}/>: null
}