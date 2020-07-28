import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter, Redirect} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import './App.css';



//COMPONENTS & PAGES TO IMPORT
import Header from "./Components/Header/index.js";
import Login from "../src/Pages/Login/index.js";
import SignUp from "../src/Pages/SignUp/index.js";
import UserProfile from "../src/Pages/UserProfile/index.js";
import CreatePost from "../src/Pages/CreatePost/index.js";
import Feed from "../src/Pages/Feed/index.js";


const firebaseConfig = { //USE DOT ENV FOR BEST PRACTICE
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


//Setting up the routes for the home page (user profile), login page, sign-up pg., and log-out page
//Want to create a new universal header component to put into the App.js (which is the highest level)
function App() {

  const [loggedIn, setLoggedIn] = useState(false); //useState lets us toggle on and off the logged in state to allow it to be dynamic
  const [user, setUser] = useState({});

  useEffect(()=> {        //use UseEffect to initialize firebase on client side
    //iniitialize firebase
    if(!firebase.apps.length) { //if there are no firebase apps, initialize firebase
      firebase.initializeApp(firebaseConfig);
    }
    //Set auth to be persistent, you can also set this as a cookie but we will use it in session storage
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION) //Sets persistence for the session so we can track that the user is authorized
      .catch(function (error) {
        // Handle Errors here.
        console.log('error', error);
      });


  }, [firebaseConfig]); //only doing this when the firebaseConfig updates

  useEffect(() => { //useEffect runs on website load. We want to check whether a user is logged in only when the page updates by using , []
    firebase.auth().onAuthStateChanged(function(user) { //Firebase checks if user exists
      if (user) {
        // User is signed in, update state to true
        setLoggedIn(true);
        setUser(user);
      } else {
        // No user is signed in, update state to false
        setLoggedIn(false);
        setUser({});
      }
    });
  }, [])

/*NOTE THESE FUNCTIONS FOR SIGNUP, LOGIN, AND LOGOUT SHOULD ALL BE SEPARATE FILES*/
//---------------------------------------------------------------------------------\\
//Check the firebase site for authenticated users in order to check if your authentication is working

function signupFunction(e){ //e is an event type
  //let email = "test@test.test";
  //let password = "test test test";
  e.preventDefault();

  let email = e.currentTarget.createEmail.value; //currentTarget lets you look inside of the form and access data within that form, gives you access to the DOM elemnts
  //createEmail is coming from the CreateAccountForm. Event handler is attached to a form, inside of there we're looking for an element createEmail and we're going to access the value of it
  let password = e.currentTarget.createPassword.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(response) { //making promise callback function
      setLoggedIn(true); //if sign up is successful, set logged in to True
  }) 
  .catch(function(error){
    console.log('error', error)
  });
}

function loginFunction(e) {
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

function logoutFunction(){
  firebase.auth().signOut().then(function() {
    setLoggedIn(false);// Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
/*NOTE THESE FUNCTIONS FOR SIGNUP, LOGIN, AND LOGOUT SHOULD ALL BE SEPARATE FILES*/
//---------------------------------------------------------------------------------\\
  

  //Nesting the components (login, signup, userProfile) in the routers so we can use props and conditionally display them
  //Using variable logged in in ternary, if they're logged in, take them to UserProfile, else redirect them to login
  //we can change the state as people log in, and then redirect them to certain pages depending on that state
  //LoginFunction is a prop on the log in page

  //3 ways to store data in broawser Local state, session state, cookies
    //Data that is typically stored in key value pairs
    //Firebase prefers local or session storage to keep track of the authentication information

  //IF YOU WANT TO REDIRECT THE USER TO A SITE OTHER THAN USERPROFILE, 
  return (
  
  <div className = "App">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300|Roboto:300&display=swap" rel="stylesheet"></link>
    <Header loggedIn = {loggedIn} logoutFunction={logoutFunction}/>
    <BrowserRouter>
      <Route exact path="/">
          { loggedIn ? <Feed user = {user} /> : <Redirect to="/login" /> } 
      </Route>
      <Route exact path="/sign-up">
         { loggedIn ? < Redirect to="/" /> : <SignUp signupFunction={signupFunction}/> }
      </Route>
      <Route exact path="/login">
          { loggedIn ? <Redirect to="/" /> : <Login loginFunction={loginFunction}/> }
      </Route>
      <Route exact path="/user-profile">
          { loggedIn ?  <UserProfile user = {user} /> : <Login loginFunction={loginFunction}/> }
      </Route>
      <Route exact path="/create-post">
          { loggedIn ?  <CreatePost user = {user} /> : <Login loginFunction={loginFunction}/> }
      </Route>     
    </BrowserRouter>
  </div>
  );
}

export default App;
