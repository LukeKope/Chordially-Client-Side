import React from "react";

import CreateAccountForm from "../../Components/CreateAccountForm/index.js"
import Logo from "../../assets/logo.png";

export default function Signup({ signupFunction }){
    return(
        <div>
            <img src = {Logo} alt = "image of the logo which is a musical note in red, blue, and yellow" className = "logoImage"/>
            <h1 className = "currentPageHeader">Create Account</h1>
            <CreateAccountForm submitFunction = {signupFunction} />
        </div>

    );
}