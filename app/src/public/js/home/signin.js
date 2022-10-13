"use strict"

const userID = document.querySelector("#userID");
const userPassword = document.querySelector("#userPassword");
const loginBtn = document.querySelector("#LOGINBTN");

loginBtn.addEventListener("click", signin);

function signin() {

    const req = {
        userID: userID.value,
        userPassword: userPassword.value,
    };
    
    fetch("/signin", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/main"
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.log("로그인 중 에러발생")
    });
}