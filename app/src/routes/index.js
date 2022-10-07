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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//firebase

router.get("/", (req, res, next) => {
    res.render("home/index");
});

router.get("/signin", (req, res, next) => {
    res.render("home/signin")
})

router.post("/signin", (req, res, next) => {

    const userID = req.body.userID;
    const userPassword = req.body.userPassword;

    signInWithEmailAndPassword(auth, userID, userPassword)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //console.log(user);
        res.status(200).json({
            success: true,
            uID: user.uid,
        });
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    });
})

router.get("/main", (req, res, next) => {
    res.render("home/main");
});
  
module.exports = router;