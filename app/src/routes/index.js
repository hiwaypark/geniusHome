"use strict"

const express = require("express");
const router = express.Router();

//firebase
const { signInWithEmailAndPassword } = require("firebase/auth");
const { firebaseApp, auth } = require("../controller/firebase/firebaseapp");

//firebase

router.get("/", (req, res, next) => {
    res.render("home/index");
});

router.get("/signin", (req, res) => {
    res.render("home/signin")
})

router.post("/signin", (req, res) => {

    const userID = req.body.userID;
    const userPassword = req.body.userPassword;

    signInWithEmailAndPassword(auth, userID, userPassword)
    .then((userCredential) => {
        
        const user = userCredential.user;
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