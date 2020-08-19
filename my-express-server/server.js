// jshint esversion:6

const express = require("express");
const app = express(); //app  is nik-name for module
//req made to our server
//res for req that will be displayed on our browser
app.get("/", function (req, res) {
  res.send("Hello There how are u");
});
//
app.get("/contact", function (req, res) {
  res.send("Contact me at: shivamchoudhary2k@gmail.com");
});
app.get("/about", function (req, res) {
  res.send("My name is shivam choudhary. ");
});
app.get("/no", function (req, res) {
  res.send("My name is shivam choudhary. ");
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
