import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

export default function loginFunction(e) {
    e.preventDefault(); //Forms default action is to submit when you click submit, however sometimes you want to do something with the data. Prevent default prevents the submission and allows the data to be passed through
  
    let email = e.currentTarget.loginEmail.value; //currentTarget lets you look inside of the form and access data within that form, gives you access to the DOM elemnts
    //loginEmail is coming from the LoginForm. Event handler is attached to a form, inside of there we're looking for an element createEmail and we're going to access the value of it
    let password = e.currentTarget.loginPassword.value; //Going into the DOM, each ./"dot" is a level deeper
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) { //making promise callback function
        setLoggedIn(true);
      })
      .catch(function (error) {
          console.log('error', error);
        });
  }