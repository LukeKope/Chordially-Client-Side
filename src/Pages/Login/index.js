import React from "react";

import LoginForm from "../../Components/LoginForm/index.js"
import Logo from "../../assets/logo.png";

export default function Login({ loginFunction }) { //have one prop from App.js that we pass down into the LoginForm

    return (
        <div>
            <img src={Logo} alt="image of the logo which is a musical note in red, blue, and yellow" className="logoImage" />
            <h1 className="currentPageHeader">Login</h1>
            <LoginForm submitFunction={loginFunction} />
            <p className="signUpLink">Don't have an account?<a href="/sign-up"> Sign up!</a></p>
        </div>
    );
}


