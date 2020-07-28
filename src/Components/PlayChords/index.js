import React, { useEffect, useState } from 'react';
import h from "h-audio";



export default function PlayNotes({ notes }) { //pass the notes in from the post and play it here
    
    console.log(notes);
    const [isClicked, setisClicked] = useState(false);

    h.configure({
        gain: 0.15,
        attack: 0.1,
        release: 0.6,
        wave: {
            type: "sine",
            data: null
        }
    });
//have a use effect that plays on load just to test it. Or have an arrow function onClick for the button
    function PlayChord() {
            h.stop(); //stop any other chords being played, then play the chord
            h.play(notes);
            console.log("chord played", notes); 
            setisClicked(true);//prevent button from being clicked multiple times and layering multiple sounds      
    }

    function StopChord() {
        h.stop();
        setisClicked(false); //re-enable the play button
    }

    return (
        <div>
            <button onClick = {() => PlayChord()} className="button" id="playButton" disabled={isClicked}>Play</button>
            <button onClick = {() => StopChord()} className="button" id="pauseButton">Stop</button>
        </div>
    )

}