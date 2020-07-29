import React, { useEffect, useState } from 'react';
import axios from 'axios'; //USE THIS TO MAKE QUERIES TO THE API

//http://kope-dynamic-web-final.herokuapp.com/
//This is the URL we're using to get the posts, this shows the entire chords database 
//can get the post by ID or filter it by the user ID to show the posts the user has made (do this for the user profile to get the users posts)
//For the feed, maybe show the most recent posts, 10 most recent posts (need to style each element of the post. Likes, notes, title, etc.)

import DisplayPost from "./display_post_V2.js"; //Display Post contains all the HTML we need to show a single post. We can call it anytime and pass in the data it needs of uid, description, and notes, and then have it display that data and play those notes

//have the feed display the most recent posts in the database? Filter by date posted
export function GetFeed({ uid }) { //PASS THE USER DATA YOU NEED INTO {} PROPS

    const userID = uid;
    const [userPosts, setUserPosts] = useState({});
    const [length, setLength] = useState(0);
    const [contentArray, setContentArray] = useState([]); //content array allows for us to dynamically see the content

    useEffect(() => {
        GetFeedQuery();
    }, [])

    useEffect(() => { //here we set the length from the post data response to ensure that the data has been set to the postData prior to putting it into the HTML                               
        const lengthVal = userPosts.data ? userPosts.data.length : 0;
        setLength(lengthVal);
    }, [userPosts])

    useEffect(() => { //we use the content Array to store the various values for the userPosts (depending on how many times the user has posted)
        let contentArrayVal = []
        for (let i = 0; i < length; i++) { //in this loop, we push all of the content that was returned from the query into the array to be displayed in the HTML
            contentArrayVal.push(<DisplayPost uid={userID} description={userPosts.data[i].Description} notes={userPosts.data[i].Notes} title={userPosts.data[i].Title} />);
        }
        setContentArray(contentArrayVal);
    }, [length])


    function GetFeedQuery() {
        axios.get(`https://chordially.herokuapp.com/`) //Make query to the database to get all posts for the feed
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
            <h1 className="currentPageHeader">Feed</h1>
            <div className="contentGridContainer">
                <div className = "postCell">{contentArray[0] ? contentArray[0] : ""}</div>
                <div className = "postCell">{contentArray[1] ? contentArray[1] : "Loading the Feed"}</div>
                <div className = "postCell">{contentArray[2] ? contentArray[2] : ""}</div>
        
                <div className = "postCell">{contentArray[3] ? contentArray[3] : ""}</div>
                <div className = "postCell">{contentArray[4] ? contentArray[4] : ""}</div>
                <div className = "postCell">{contentArray[5] ? contentArray[5] : ""}</div>

                <div className = "postCell">{contentArray[6] ? contentArray[6] : ""}</div>
                <div className = "postCell">{contentArray[7] ? contentArray[7] : ""}</div>
                <div className = "postCell">{contentArray[8] ? contentArray[8] : ""}</div>
            </div>
            
        </div>
    );
}

/* TABLE WITH NOTE NAMES
                        <tr><td>O</td> <p className="noteName">C</p></tr>
                        <tr><td>O</td> <p className="noteName">B</p></tr>
                        <tr><td>O</td> <p className="noteName">A</p></tr>
                        <tr><td>O</td> <p className="noteName">G</p></tr>
                        <tr><td>O</td> <p className="noteName">F</p></tr>
                        <tr><td>O</td> <p className="noteName">E</p></tr>
                        <tr><td>O</td> <p className="noteName">D</p></tr>
                        <tr><td>O</td> <p className="noteName">C</p></tr>

*/