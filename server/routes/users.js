'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Item = require('../database/models/Item');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const registeredUser = require('../middleware/userGuard');
const ownershipGuard = require('../middleware/ownershipGuard');

router.route('/all').get(registeredUser, (req, res) => {
  new User()
    .fetchAll({ withRelated: ['roles'] })
    .then((result) => {
      // reply with logged in user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/:id').get(registeredUser, ownershipGuard, (req, res) => {
  new User({ id: req.params.id })
    .fetch({ withRelated: ['roles'] })
    .then((result) => {
      // console.log(result)

      // reply with logged in user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

//public route gets username ONLY
router.route('/:id/username').get((req, res) => {
  new User({ id: req.params.id })
    .fetch({ columns: ['username'] })
    .then((result) => {
      // console.log(result)

      // reply with logged in user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/items/:userId').get(registeredUser, ownershipGuard, (req, res) => {
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

// get all active items from a single user
router.route('/items/:id/active').get((req, res) => {
  Item.where({ user_id: req.params.id, active: true })
    .fetchAll()
    .then((result) => {
      // replies with all active items associated with the user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// get all inactive items from a single user
router.route('/items/:id/inactive').get(registeredUser, ownershipGuard, (req, res) => {
  Item.where({ user_id: req.params.id, active: false })
    .fetchAll()
    .then((result) => {
      // replies with all inactive items associated with the user
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// admin edit user - NEEDS ADMIN GUARD?!
router.route('/admin').put((req, res) => {
  new User('id', req.body.id)
    .save({
      role_id: req.body.role_id,
      active: req.body.active
    })
    .then((result) => {
      new User({ id: req.body.id })
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

router.route('/profile').put((req, res) => {
  new User('id', req.user.id)
    .save({
      name: req.body.name,
      email: req.body.email,
      active: req.body.active
    })
    .then((result) => {
      new User({ id: req.user.id })
        .fetch({withRelated: ['roles']})
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
