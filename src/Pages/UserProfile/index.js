import React from "react";

//this is a component that we're pushing here
import { UserInformation } from '../../Components/UserProfileComponents/index.js';

export default function UserProfile({ user }){
    //NOTE WE NEED THE USER.UID TO ACCESS THE USER FOR FINAL PROJECT
    return (
        <div>
            <UserInformation uid = {user.uid ? user.uid: "loading uid"} email={user.email ? user.email: "oops"} />
        </div>
    )

}