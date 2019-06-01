'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Item = require('../database/models/Item');
const bcrypt = require('bcryptjs');
const saltRounds = 12;

router.route('/').get((req, res) => {
  new User({ id: req.user.id })
    .fetch()
    .then((result) => {
      // reply with logged in user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/items/:userId').get((req, res) => {
  Item.where({ user_id: req.params.userId })
    .fetchAll()
    .then((result) => {
      // reply with all items associated with the user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// edit general profile
router.route('/profile').put((req, res) => {
  new User('id', req.user.id)
    .save({
      name: req.body.name,
      email: req.body.email,
    })
    .then((result) => {
      new User({ id: req.user.id })
        .fetch()
        .then((result) => {
          const user = result.toJSON();
          return res.send(user);
        })
        .catch((err) => {
          console.log('error:', err);
        });
    });
});

// change theme
router.route('/theme').put((req, res) => {
  new User('id', req.user.id)
    .save({
      theme_id: req.body.theme_id,
    })
    .then((result) => {
      new User({ id: req.user.id })
        .fetch()
        .then((result) => {
          const user = result.toJSON();
          return res.send(user);
        })
        .catch((err) => {
          console.log('error:', err);
        });
    });
});

// change password
router.route('/password').put((req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log('error:', err);
      return res.status(500).send('Unable to generate salt');
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        console.log('error:', err);
        return res.status(500).send('Unable to encrypt');
      }

      new User('id', req.user.id)
        .save({ password: hash })
        .then((result) => {
          new User({ id: req.user.id }).fetch().then((result) => {
            return res.json(result);
          });
        })
        .catch((err) => {
          console.log('error:', err);
          return res.status(500).send('Error changing password');
        });
    });
  });
});

module.exports = router;
