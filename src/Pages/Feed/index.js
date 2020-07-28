import React from "react";

//this is a component that we're pushing here
import { GetFeed } from '../../Components/FeedComponents/index.js';

export default function displayFeed({ user }){
    //NOTE WE NEED THE USER.UID TO ACCESS THE USER FOR FINAL PROJECT
    //IN THE GETFEED HERE PASS THROUGH WHATEVER DATA WE NEED FOR THE FEEDCOMPONENTS!
    return (
        <div>
            <GetFeed uid = {user.uid ? user.uid: "missing uid"}/> 
        </div>
    )

}