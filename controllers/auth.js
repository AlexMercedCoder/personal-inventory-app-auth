// import express
const express = require("express");
// create an express router
const router = express.Router();
// import the User model
const User = require("../models/User");
// import bcrypt
const bcrypt = require("bcrypt");

// register the router under the /auth

// signup post - /auth/signup
router.post("/signup", async (req, res) => {
  try {
    // hash the password
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync(10)
    );

    // create the user
    const user = await User.create(req.body);

    // redirect back to main

    res.redirect("/?signedUp=true");
  } catch (error) {
    console.log(error.message);
    res.redirect("/?failedLogin=true");
  }
});

// Login post - /auth/login

router.post("/login", async (req, res) => {
  try {
    // grab the submitted username and password
    const { username, password } = req.body;
    // attempt to fetch the user from the database
    const user = await User.findOne({ username });
    // check if the user exists
    if (user) {
      const passwordCheck = bcrypt.compareSync(password, user.password);
      if (passwordCheck) {
        req.session.username = username;
        req.session.loggedIn = true;
        res.redirect("/inventory");
      } else {
        throw new Error("passwords did not match");
      }
    } else {
      throw new Error("User Doesn't Exist");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("/?failedLogin=true");
  }
});

// logout
router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})

module.exports = router;
