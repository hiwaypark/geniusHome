"use strict"

const express = require("express");
const router = express.Router();

//firebase
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
    // apiKey: "AIzaSyBUFULXj2VzwRRVlJzCeecNeQlNZoEAr3M",
    // authDomain: "geniushome-25e61.firebaseapp.com",
    // projectId: "geniushome-25e61",
    // storageBucket: "geniushome-25e61.appspot.com",
    // messagingSenderId: "104778244809",
    // appId: "1:104778244809:web:e64f7578d3f36b8edb2318",
    // measurementId: "G-H5ZTJSJCMR"
    
    apiKey: "AIzaSyDQCcjfc3hOhfps6fDrfZX1Rt_Prt_jFD0",
    authDomain: "minzselfcheck.firebaseapp.com",
    databaseURL: "https://minzselfcheck-default-rtdb.firebaseio.com",
    projectId: "minzselfcheck",
    storageBucket: "minzselfcheck.appspot.com",
    messagingSenderId: "414911030930",
    appId: "1:414911030930:web:145e1f6b58321d50e1e84b",
    measurementId: "G-HX20VVH7N5"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

module.exports = {
    firebaseApp,
    auth,
}