const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

var app = express();
app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
});

app.use(function (req, res, next) {
    res.status(500);
    res.send("Internal server error.");
});

app.use(function (req, res) {
    res.status(404);
    res.send("File not found");
});

app.listen(3000, function () {
    console.log("App is running on port 3000");
});