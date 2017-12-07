const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();

app.use(function (req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request Date: " + new Date());
    next();
});

app.use(function (req, res, next) {
    var filePath = path.join(__dirname, "static", req.url);
    fs.stat(filePath, function (err, fileInfo) {
        if (err) {
            next();
            return;
        }
        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});


app.use(function (req, res) {
    res.status(404);
    res.send("File not found");
});



app.listen(3000, function () {
    console.log("App is running on port 3000");
})