import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DisplayPost from "../FeedComponents/display_post.js"; //Display Post contains all the HTML we need to show a single post. We can call it anytime and pass in the data it needs of uid, description, and notes, and then have it display that data and play those notes

export function UserInformation({ uid, email }) {
    const userID = uid;
    const [userPosts, setUserPosts] = useState({});    
    const [length, setLength] = useState(0);
    const [contentArray, setContentArray] = useState([]); //content array allows for us to dynamically see the content
    useEffect(() => {
        getUserPosts();
        
    }, [uid])

    useEffect(() => { //here we set the length from the post data response to ensure that the data has been set to the postData prior to putting it into the HTML                               
        const lengthVal = userPosts.data ? userPosts.data.length: 0;
        setLength(lengthVal);        
    }, [userPosts])

    useEffect(()=>{ //we use the content Array to store the various values for the userPosts (depending on how many times the user has posted)
        let contentArrayVal = []
        for(let i=0;i<length;i++){
            contentArrayVal.push(<DisplayPost uid = { userID } description = { userPosts.data[i].Description } notes = { userPosts.data[i].Notes } title = { userPosts.data[i].Title }/>);
        }    

        setContentArray(contentArrayVal);

    },[length])


    console.log(uid, contentArray);
    /*MAKE QUERY TO HEROKU FOR THE DATA*/
    function getUserPosts() {
        axios.get(`https://chordially.herokuapp.com/get-all-user-posts/${uid}`) //get all user posts for this specific user's ID
            .then(function (response) {
                setUserPosts(response);
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log('error', error);
                return error;
            });

        console.log(userPosts);
    }

    return (
        <div>
            <div>
                <h3 className="currentPageHeader">User Posts</h3>
                <p className="currentPageHeader" textDecoration="underline">Profile for {email}</p>
            </div>
            <div id = "userPosts">
                {contentArray[0] ? contentArray[0]: "Create your first post!"}
                {contentArray[1] ? contentArray[1]: ""}   
                {contentArray[2] ? contentArray[2]: ""}   
                {contentArray[3] ? contentArray[3]: ""}   
                {contentArray[4] ? contentArray[4]: ""}   
                {contentArray[5] ? contentArray[5]: ""}   
                {contentArray[6] ? contentArray[6]: ""}   
                {contentArray[7] ? contentArray[7]: ""}   
                {contentArray[8] ? contentArray[8]: ""}   
                {contentArray[9] ? contentArray[9]: ""}   
                   
            </div>
        </div>
        );
}