const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const User = require("../models/user");

router.put("/api/update/:userID/:postID", (req,res) => {
  User.updateOne({ _id: req.params.userID }, {$push: {posts: req.params.postID}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
})

// Public route
router.post("/api/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      const newUser = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        username: req.body.username,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

// @route PUT api/user/update/id/newpw
// @desc changes user password
// @access Private
router.put("/api/user/update/:userID/:newPW/:oldPW", (req, res) => {

  const _id = req.params.userID;
  User.findOne({ _id }).then(user => {
    // Check if user exists
    if (!user) {
      return res.json({ error: "Account error. Try again later", success: false });
    }

    bcrypt.compare(req.params.oldPW, user.password).then(isMatch => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.params.newPW, salt, (err, hash) => {
            if (err) throw err;
      
            User.updateOne({ _id: req.params.userID }, {$set: {password: hash}})
            .then(dbModel => res.json({ error: "Password changed successfully", success: true }))
            .catch(err => res.json({ error: "Unknown error occured", success: false }));
          });
        })
        
      } else {
        return res
          .json({ error: "Password incorrect", success: false });
      }
    });
  })
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/api/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  // Find user by username
  User.findOne({ username }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ usernamenotfound: "Username not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
