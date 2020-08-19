//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const sessions = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
// const bcrypt = require("bcrypt");
// const saltRound = 10;
// const md5 = require("md5");
//--------------
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  sessions({
    secret: "Our Little Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect("mongodb://localhost:27017/UserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
//---------------

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
//||||||||||
//GOOGLE Autentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);


//---------------

app.get("/", function (req, res) {
  res.render("home");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/secrets");
  }
);
app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  //on home page /register button got clicked and that information comes on .get method
  res.render("register"); //showing/giving/responsing back what is on register page
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});
app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

//---------------

//.post helps to transfers information from browser to server
app.post("/register", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
  // bcrypt.hash(req.body.password, saltRound, function (err, hash) {
  //   //User giving password-->adding salt-->generating hash
  //   const newUser = new User({
  //     email: req.body.username,
  //     password: hash,
  //     // password: md5(req.body.password),
  //   });
  //   newUser.save(function (err) {
  //     if (!err) {
  //       res.render("secrets");
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // });
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    passport: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });

  // // const password = md5(req.body.password);

  // User.findOne({ email: username }, function (err, founduser) {
  //   //DATABASE
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (founduser) {
  //       //comparing user pasword to data base pasword and giving result
  //       bcrypt.compare(password, founduser.password, function (err, result) {
  //         if (result === true) {
  //           res.render("secrets");
  //         }
  //       });
  //     }
  //   }
  // });
});

//---------------
app.listen(3000, function () {
  console.log("Server is running at port 3000 ");
});
