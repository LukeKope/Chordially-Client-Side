import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function CreatePost({ uid }) {

    const [submitting, setSubmitting] = useState(false); //Vars to tell user we're submitting their data and to disable the button to submit while the data is being pushed!
    const [errors, setErrors] = useState(false); //Display any errors present to the user
    const [postData, setPostData] = useState({});
    const [datePosted, setDatePosted] = useState("");

    useEffect(() => {
        var currentdate = new Date();
        var datePosted = currentdate.getDate() //set the date posted
            + (currentdate.getMonth() + 1)
            + currentdate.getFullYear()
            + currentdate.getHours()
            + currentdate.getMinutes()
            + currentdate.getSeconds();
        setDatePosted(datePosted);
    }, [postData]);
    //Once we have the data from the form (maybe set it with a useState and useEffect to ensure we have the data and don't post null)
    //http://kope-dynamic-web-final.herokuapp.com/create-post?datePosted=134&description=this%20is%20a%heroku%20test&notes=C4&title=myfavoritechord&userID=12345
    function createPost(e) {
        setSubmitting(true);
        e.preventDefault(e); //prevents the form from doing default action

        //set URL query parameters to be the form submissions
        let title = e.currentTarget.title.value.replace(/#/g, "%23");//accounts for if the user puts a # in their title
        let notes = e.currentTarget.notes.value.replace(/#/g, "%23"); //replace all # with %23, the URL encode of that value. This is key for notes such as C# (C sharp), or any other sharp notes. When we try to pass a # into the url search params, it glitches. So we need to encode the # with its ASCII encoding value of %23
        let description = e.currentTarget.description.value.replace(/#/g, "%23");//accounts for if people want to use #'s in their description     
        console.log(title, notes, description);

        axios.get(`https://kope-dynamic-web-final.herokuapp.com/create-post?datePosted=${datePosted}&description=${description}&notes=${notes}&title=${title}&userID=${uid}`) //create a post with the form data and attribute that user's ID
            .then(function (response) {
                setPostData(response);
                console.log(response);
                return response;
            })
            .catch(function (error) {
                setErrors(true);
                console.log('error', error);
                return error;
            });

        console.log(postData);
    }


    //accept-charset allows for # and other special characters in the submission. 

    return (
        <div>
            <form onSubmit={e => createPost(e)} name="createPostForm" method="GET">
                {errors && <p>Errors: {errors} </p>}
                <label htmlFor="title">Title</label>
                <input type="text" className="formEntry" name="title" placeholder="What's the name of this chord?" />
                <label htmlFor="notes">Notes</label>
                <input type="text" className="formEntry" name="notes" placeholder="C2, E3, G#..." />
                <label htmlFor="description">What does this chord convey?</label>
                <input type="text" className="formEntry" id="createPostDescription" name="description" placeholder="Description" />
                <input type="submit" value="Post" className="button" disabled={submitting} />
                {submitting && <p id="submittingConfirm">Submitted!</p>}
            </form>
        </div>
    );
}

