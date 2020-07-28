import React from 'react';

//This page contains the HTML components for the feed page. It shows the grid that has the user, the table with their chords, and the play and pause button
/*this allows for the html content to be abstracted and makes it cleaner when displaying multiple posts. Then all you need to do is pass the data from the page you're displaying it on and then 
pass in the data you want to display!*/

import PlayChords from "../PlayChords/index.js"

//have the feed display the most recent posts in the database? Filter by date posted
export default function GetFeed({ uid, description, notes, title }) { //PASS THE USER DATA YOU NEED INTO {} PROPS



    let showUser = uid; //could show the user ID if I wanted to
    let showTitle = title;
    let showDescription = description;
    let showNotes = notes.replace(/,(?=[^\s])/g, ", "); //format the notes with .replace to add spaces so it works with the h-audio (also accounts for if there are no spaces, then it does not replace)

    return (
        <div>
            <div className="squareContainer">
                <div id="postClickContainer">
                    <div className="titleContainer">
                        <h3>{showTitle}</h3>
                    </div>
                    <div className="descriptionContainer">
                        <p>{showNotes}</p>
                        <p>{showDescription}</p>
                    </div>
                </div>
                <div className="playPauseContainer">
                    <PlayChords notes={showNotes} />
                </div>
            </div>


        </div >
    );
}
