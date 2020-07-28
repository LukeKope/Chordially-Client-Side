import React from "react";

export default function CreateAccount({ submitFunction }) {
    return( 
    <div className = "formDiv">
        <form onSubmit={e=>submitFunction(e)}>
            <label htmlFor="createEmail"></label>
            <input type="email" name="createEmail" className = "formEntry" placeholder="Email"/>
            <label htmlFor = "createPassword"></label>
            <input type="password" name="createPassword" className = "formEntry" placeholder="Password"/>
            <button className = "button">Create Account</button>
        </form>
    </div>
    );
}