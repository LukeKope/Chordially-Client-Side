
import React from "react";

import CreatePostForm from "../../Components/CreatePostForm/index.js"


export default function CreatePost({ user }) {
    return( 
    <div className = "formDiv">
        <CreatePostForm uid = {user.uid ? user.uid: "missing user ID"}/>
    </div>
    );
}