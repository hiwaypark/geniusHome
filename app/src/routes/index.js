"use strict"

const express = require("express");
const router = express.Router();

//firebase
const { signInWithEmailAndPassword } = require("firebase/auth");
const { DataSnapshot, get, child } = require("firebase/database");
const { firebaseApp, auth, db, dbRef } = require("../controller/firebase/firebaseapp");

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
        res.redirect("/main");        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(userID, ": " , errorMessage);
        res.write("<script>alert(`SIGN IN ERROR`)</script>");
        res.write("<script>window.location=\"/signin\"</script>");
    });
});

router.get("/main", (req, res) => {
    
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    get(child(dbRef, "minzDB/boardMainDB/김포양주 건설사업단"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var rows =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                rows.push(childData);
            })
            console.log(rows);
        } else {
            console.log("No DATA");
        }

        res.render("home/main");
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/boardMain", (req, res) => {
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    get(child(dbRef, "minzDB/boardMainDB/김포양주 건설사업단"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var rows =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                rows.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        res.render("home/boardmain");
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/boardSector", (req, res) => {
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    get(child(dbRef, "minzDB/boardSectorDB/김포양주 건설사업단"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var rows =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                rows.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        res.render("home/boardsector");
    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/safeCheck", (req, res) => {
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    get(child(dbRef, "minzDB/safeCheckDB/김포양주 건설사업단"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var rows =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                rows.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        res.render("home/safecheck");
    })
    .catch((error) => {
        console.log(error);
    });
});
  
module.exports = router;