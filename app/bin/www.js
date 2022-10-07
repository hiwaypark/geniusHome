"use strict"

const app = require("../app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, (res, req) => {
    console.log(`SERVER ACTIVATE at ${PORT}`);
})