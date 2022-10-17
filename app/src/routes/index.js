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

    res.render("home/main");
    
});

router.get("/boardMain", (req, res) => {
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    const uID = auth.currentUser.uid;

    get(child(dbRef, "minzDB/userDB/"+uID))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var userData =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                userData.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        get(child(dbRef, "minzDB/boardMainDB/김포양주 건설사업단"))
        .then((snapshot1) => {
            if (snapshot1.exists()) {
                var boardData =[];
                snapshot1.forEach((doc) => {
                    var childData = doc.val();
                    boardData.push(childData);
                })
                //최신 데이터를 위로 올려주기
                boardData.reverse();
                console.log(boardData);
            } else {
                console.log("No DATA");
            }

            res.render("home/boardmain", {userData: userData, boardData: boardData});
        })
        .catch((error) => {
            console.log(error);
        });

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

    const uID = auth.currentUser.uid;

    get(child(dbRef, "minzDB/userDB/"+uID))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var userData =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                userData.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        const userSector = userData[4];

        get(child(dbRef, "minzDB/boardSectorDB/김포양주 건설사업단/"+userSector))
        .then((snapshot1) => {
            if (snapshot1.exists()) {
                var boardData =[];
                snapshot1.forEach((doc) => {
                    var childData = doc.val();
                    boardData.push(childData);
                })
                //최신 데이터를 위로 올려주기
                boardData.reverse();
            } else {
                console.log("No DATA");
            }

            res.render("home/boardsector", {userData: userData, boardData: boardData});
        })
        .catch((error) => {
            console.log(error);
        });

    })
    .catch((error) => {
        console.log(error);
    });
});

router.get("/boardDetail", (req, res) => {
    if(!auth.currentUser) {
        res.redirect("/signin");
        return;
    }

    const index = req.query.index;
    console.log(index);

    const uID = auth.currentUser.uid;
    get(child(dbRef, "minzDB/userDB/"+uID))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var userData =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                userData.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        get(child(dbRef, "minzDB/boardMainDB/김포양주 건설사업단"))
        .then((snapshot1) => {
            if (snapshot1.exists()) {
                var boardData =[];
                snapshot1.forEach((doc) => {
                    var childData = doc.val();
                    boardData.push(childData);
                })
                //최신 데이터를 위로 올려주기
                boardData.reverse();
                console.log(boardData);
            } else {
                console.log("No DATA");
            }

            res.render("home/boardmain", {userData: userData, boardData: boardData});
        })
        .catch((error) => {
            console.log(error);
        });

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

    const uID = auth.currentUser.uid;

    get(child(dbRef, "minzDB/userDB/"+uID))
    .then((snapshot) => {
        if (snapshot.exists()) {
            var userData =[];
            snapshot.forEach((doc) => {
                var childData = doc.val();
                userData.push(childData);
            })

        } else {
            console.log("No DATA");
        }

        get(child(dbRef, "minzDB/safeCheckDB/김포양주 건설사업단"))
        .then((snapshot1) => {
            if (snapshot1.exists()) {
                var safeData =[];
                snapshot1.forEach((doc) => {
                    var childData = doc.val();
                    safeData.push(childData);
                })
                //최신 데이터를 위로 올려주기
                safeData.reverse();
            } else {
                console.log("No DATA");
            }

            res.render("home/safecheck", {userData: userData, safeData: safeData});
        })
        .catch((error) => {
            console.log(error);
        });

    })
    .catch((error) => {
        console.log(error);
    });
});
  
module.exports = router;