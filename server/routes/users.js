'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Item = require('../database/models/Item');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const ownershipGuard = require('../middleware/ownershipGuard');
const isAdminGuard = require('../middleware/isAdminGuard.js');

router.route('/all').get(isLoggedInGuard, isAdminGuard, (req, res) => {
  new User()
    .fetchAll({ withRelated: ['roles'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/:id').get(isLoggedInGuard, (req, res) => {
  new User({ id: req.params.id })
    .fetch({ withRelated: ['roles'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/:id/username').get((req, res) => {
  new User({ id: req.params.id })
    .fetch({ columns: ['username'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/items/:id').get(isLoggedInGuard, ownershipGuard, (req, res) => {
  Item.where({ user_id: req.params.id })
    .fetchAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/items/:id/active').get((req, res) => {
  Item.where({ user_id: req.params.id, active: true })
    .fetchAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/items/:id/inactive').get(isLoggedInGuard, ownershipGuard, (req, res) => {
  Item.where({ user_id: req.params.id, active: false })
    .fetchAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/profile').put(isLoggedInGuard, ownershipGuard, (req, res) => {
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

router.route('/theme').put(isLoggedInGuard, ownershipGuard, (req, res) => {
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

router.route('/password').put(isLoggedInGuard, ownershipGuard, (req, res) => {
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

      new User('id', req.body.id)
        .save({ password: hash })
        .then((result) => {
          new User({ id: req.body.id }).fetch().then((result) => {
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
