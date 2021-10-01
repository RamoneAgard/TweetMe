import React, { useEffect, useState } from "react"
import { apiProfileDetail } from './lookup'


export function ProfileBadgeComponent(props){
    const {username} = props 

    //lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)

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

    return didLookup === false ? "Loading" : profile ? 
    <React.Fragment> {profile.username} </React.Fragment> 
    : null
}