import React from "react";

export default function Login({ submitFunction }) {
    return( 
    <div className = "formDiv">
        <form onSubmit={e => submitFunction(e)}>
            <label htmlFor="loginEmail"></label>
            <input type="email" className = "formEntry" name="loginEmail" placeholder="Email"/>
            <label htmlFor = "loginPassword"></label>
            <input type="password" className = "formEntry" name="loginPassword" placeholder="Password"/>
            <button className = "button">Log In</button>
        </form>
    </div>
    );
}