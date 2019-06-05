const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../database/models/User');

const saltRounds = 12;

router.route('/register').post((req, res) => {
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
        profile_image_url: req.body.profile_image_url,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .save() // Save model to database
        .then((newUser) => {
          console.log('User created: ', newUser);
          return res.json(newUser); // Valid user data sends a response with userData.
        })
        .catch((error) => {
          // Custom objects to hide sensitive or uneccessary DB information.
          if (error.constraint === 'users_username_unique') {
            return res.json({
              usernameErrorMessage: req.body.username + ' is not available! Please enter another.',
            });
          } else {
            console.log('error ', error);
            return res.json({
              message: 'error',
            });
          }
        });
    });
  });
});

// next transfers control to the next middleware function.
router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json(err);

    } else {
      if (!user) {
        return res.json({error : info.message});

      } else {
        req.logIn(user, ()=>{});
        return res.json(user);
      }
    }
  })(req, res, next);
})

router.route('/logout').get((req, res) => {
  // console.log('Logged Out');
  req.logout(); // if a user is logged in, req.logout will remove the user property from the req and terminate the session if there is one
  return res.json(null);
});

module.exports = router;
