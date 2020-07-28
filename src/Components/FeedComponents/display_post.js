import React, { useEffect, useState } from 'react';

//This page contains the HTML components for the feed page. It shows the grid that has the user, the table with their chords, and the play and pause button
/*this allows for the html content to be abstracted and makes it cleaner when displaying multiple posts. Then all you need to do is pass the data from the page you're displaying it on and then 
pass in the data you want to display!*/

import PlayChords from "../PlayChords/index.js"

//have the feed display the most recent posts in the database? Filter by date posted
export default function GetFeed({ uid, description, notes, title }) { //PASS THE USER DATA YOU NEED INTO {} PROPS

    const [C2InNotes, setC2InNotes] = useState(false);
    const [C2SharpInNotes, setC2SharpInNotes] = useState(false);
    const [BInNotes, setBInNotes] = useState(false);
    const [BSharpInNotes, setBSharpInNotes] = useState(false);
    const [AInNotes, setAInNotes] = useState(false);
    const [ASharpInNotes, setASharpInNotes] = useState(false);
    const [GInNotes, setGInNotes] = useState(false);
    const [GSharpInNotes, setGSharpInNotes] = useState(false);
    const [FInNotes, setFInNotes] = useState(false);
    const [FSharpInNotes, setFSharpInNotes] = useState(false);
    const [EInNotes, setEInNotes] = useState(false);
    const [ESharpInNotes, setESharpInNotes] = useState(false);
    const [DInNotes, setDInNotes] = useState(false);
    const [DSharpInNotes, setDSharpInNotes] = useState(false);
    const [C1InNotes, setC1InNotes] = useState(false);
    const [C1SharpInNotes, setC1SharpInNotes] = useState(false);

    let showUser = uid; //could show the user ID if I wanted to
    let showTitle = title;
    let showDescription = description;
    let showNotes = notes.replace(/,(?=[^\s])/g, ", "); //format the notes with .replace to add spaces so it works with the h-audio (also accounts for if there are no spaces, then it does not replace)
    let styles = {
        opacity: 1,
    }
    let empty_row_notes_styles = { //what this does is allow for us to display empty rows when there is no note present. We have a dummy row with a note O that is the same color as the table to give the illusion of an empty row
        color: '#ff9c2e'
    }

    useEffect(() => { //check to see which notes are present in the notes so we can decide which notes to show on the table
        //This has terrible runtime, you're checking the entire string EACH TIME!! Fix this for future (maybe add to an array and pop from the array?)
        if (notes.includes("#")) {
            //if there's a # in notes, search for the # notes
            setC2SharpInNotes(notes.includes("C#2")); //includes returns true or false if those chars are in the string
            setBSharpInNotes(notes.includes("B#"));
            setASharpInNotes(notes.includes("A#"));
            setGSharpInNotes(notes.includes("G#"));
            setFSharpInNotes(notes.includes("F#"));
            setESharpInNotes(notes.includes("E#"));
            setDSharpInNotes(notes.includes("D#"));
            setC1SharpInNotes(notes.includes("C1#"));
        } //search for the none sharp (no #) notes. We do this because if the notes includes B#, then it also includes B and only triggers the B        
            setC2InNotes(notes.includes("C2") || notes.includes("C3") || notes.includes("C4")); //includes returns true or false if those chars are in the string        
            setBInNotes(notes.includes("B"));
            setAInNotes(notes.includes("A"));
            setGInNotes(notes.includes("G"));
            setFInNotes(notes.includes("F"));
            setEInNotes(notes.includes("E"));
            setDInNotes(notes.includes("D"));
            setC1InNotes(notes.includes("C1"));
        

    }, [notes])

    return (
        <div>
            <div className="grid-container">
                <div className="UserSection">
                    <h2>Description</h2>
                    <div>
                        <p>{showDescription}</p>
                    </div>
                </div>
                <div className="ChordsTable">
                    <h4 className="title">{showTitle}</h4>
                    <p className="title">Notes played: {showNotes}</p>
                    <table>
                        <tbody>
                            <tr>{C2InNotes && <td className="C2" style={styles}>O</td>}{C2SharpInNotes && <td className="C2Sharp" style={styles}>O#</td>}</tr>
                            <tr>{BInNotes && <td className="B" style={styles}>O</td>}{BSharpInNotes && <td className="BSharp" style={styles}>O#</td>}</tr>
                            <tr>{AInNotes && <td className="A" style={styles}>O</td>}{ASharpInNotes && <td className="ASharp" style={styles}>O#</td>}</tr>
                            <tr>{GInNotes && <td className="G" style={styles}>O</td>}{GSharpInNotes && <td className="GSharp" style={styles}>O#</td>}</tr>
                            <tr>{FInNotes && <td className="F" style={styles}>O</td>}{FSharpInNotes && <td className="FSharp" style={styles}>O#</td>}</tr>
                            <tr>{EInNotes && <td className="E" style={styles}>O</td>}{ESharpInNotes && <td className="ESharp" style={styles}>O#</td>}</tr>
                            <tr>{DInNotes && <td className="D" style={styles}>O</td>}{DSharpInNotes && <td className="DSharp" style={styles}>O#</td>}</tr>
                            <tr>{C1InNotes && <td className="C1" style={styles}>O</td>}{C1SharpInNotes && <td className="C1Sharp" style={styles}>O#</td>}</tr>
                        </tbody>
                    </table>
                </div>
                <div className="LikesPlayPause">
                    <PlayChords notes={showNotes} />
                </div>

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