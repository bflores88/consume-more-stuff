const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../database/models/User');

const saltRounds = 12;

router.route('/register').post((req, res) => {
  console.log('/register post request, ', req.body);
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) {
      console.log('genSalt error ', error);
    } //return 500

    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) {
        console.log('hash error ', error);
      } //return 500

      return new User({
        // If no errors were encountered salting and hashing the password then create a new model.

        role_id: 3, // Basic User
        active: true,
        theme_id: 1, // Default Theme
        username: req.body.username,
        profileImageUrl: req.body.profileImageUrl,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .save() // Save model to database
        .then((newUser) => {
          return res.json(newUser); // Valid user data sends a response with userData
        })
        .catch((error) => {
          if (error.constraint === 'users_username_unique') {
            // identify what caused error during save attempt
            return res.json({
              // create an object that only informs of error and doesnt expose database details
              // element : 'username',
              // errorMessage : 'username taken'
            });
          } else {
            console.log('error ', error);
            return res.json({
              // message: 'error'
            });
          }
        });
    });
  });
});

router.route('/login').post(passport.authenticate('local'), (req, res) => { // req res function only happens if authenication suceeded
  return res.json(req.user); // successful login attaches the user property to the req.
});

router.route('/logout').get((req, res) => {
  // console.log('Logged Out');
  req.logout(); // if a user is logged in, req.logout will remove the user property from the req and terminate the session if there is one
  return res.json(null);
});

module.exports = router;
