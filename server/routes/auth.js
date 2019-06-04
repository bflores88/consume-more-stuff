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
    }

    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) {
        console.log('hash error ', error);
      }

      return new User({
        role_id: 3,
        active: true,
        theme_id: 1,
        username: req.body.username,
        profile_image_url: req.body.profile_image_url,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .save()
        .then((newUser) => {
          console.log('User created: ', newUser);
          return res.json(newUser);
        })
        .catch((error) => {
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

router.route('/login').post(passport.authenticate('local'), (req, res) => {
  console.log('logged in successfully, ', req.user);
  return res.json(req.user);
});

router.route('/logout').get((req, res) => {
  req.logout();
  return res.json(null);
});

module.exports = router;
