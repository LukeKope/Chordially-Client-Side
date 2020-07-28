import React from "react";

export default function Header({loggedIn, logoutFunction}){ //passing props if logged In which returns T or F if user is logged in or out
    //Passing the logout function in as props to be listened for as an onClick event handler
    return(
        <header className = "Header">
            <nav>
                {loggedIn && <a href = "/">Home</a>}
                {loggedIn && <a href = "/create-post">Create Post</a>}
                {!loggedIn && <a href = "/login">Login</a>}
                {!loggedIn && <a href = "/sign-up">Sign Up</a>}
                {loggedIn && <a onClick={() => logoutFunction()}>Log out</a>}
                {loggedIn && <a href = "/user-profile">User Profile</a>}
            </nav>
        </header>


    )
}