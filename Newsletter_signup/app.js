//jshint esversion:6
const express = require("express");
const bodypraser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodypraser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members: {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    },
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/5a6bccf35b";

  const options = {
    method: "POST",
    auth: "shivam1:57d50fe9fefd13b7a17bc6cc391245f0-us17",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request, write(jsonData);
  request.end();
});
app.listen(3000, function () {
  console.log("Server is running at port:3000 ");
});

//api key
//57d50fe9fefd13b7a17bc6cc391245f0-us17
//List id
//5a6bccf35b
