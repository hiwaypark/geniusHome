"use strict"

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("views", "./app/src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//라우터 설정
const router = require("./src/routes");
app.use("/", router);

module.exports = app;