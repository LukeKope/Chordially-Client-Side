import React, { useEffect, useState } from 'react';
//parse the data from the response here and push it to the API
import axios from 'axios';

//http://kope-dynamic-web-final.herokuapp.com/create-post?datePosted=134&description=this%20is%20a%heroku%20test&notes=C4&title=myfavoritechord&userID=12345
//^ this is the url of the query we're making. We want to set the datePosted, description, notes, title, and userID
//Use a form like with exercise 4, but put the submit values into the url params! Pass the user in as props. Style the form to be ~*a e s t h e t i c*~


export default function CreatePostQuery({ uid }) {

    const [postData, setPostData] = useState({});
    const [params, setParams] = useState({});
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [description, setDescription] = useState("");
    const [datePosted, setDatePosted] = useState("");

    useEffect(() => {
        createPost(); //make the query to the API only once
    }, [])

    useEffect(() => {
        let params = new URLSearchParams(document.location.search.substring(1));//gets URL params without the question mark
        setParams(params);
        const title = params.get("title");
        setTitle(title);
        const notes = params.get("notes");
        setNotes(notes);
        const description = params.get("description");
        setDescription(description);
        var currentdate = new Date();
        var datePosted = currentdate.getDate() //set the date posted
            + (currentdate.getMonth() + 1)
            + currentdate.getFullYear()
            + currentdate.getHours()
            + currentdate.getMinutes()
            + currentdate.getSeconds();
        setDatePosted(datePosted);
        console.log(datePosted);

        console.log(title, notes, description);
    }, [postData])


    //Once we have the data from the form (maybe set it with a useState and useEffect to ensure we have the data and don't post null)
    //http://kope-dynamic-web-final.herokuapp.com/create-post?datePosted=134&description=this%20is%20a%heroku%20test&notes=C4&title=myfavoritechord&userID=12345
    function createPost() {
        axios.get(`http://kope-dynamic-web-final.herokuapp.com/create-post?datePosted=${datePosted}&description=${description}&notes=${notes}&title=${title}&userID=${uid}`) //create a post with the form data and attribute that user's ID
            .then(function (response) {
                setPostData(response);
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log('error', error);
                return error;
            });

        console.log(postData);
    }

    return (
        <div></div>
    )

}