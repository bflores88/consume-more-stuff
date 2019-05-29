'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');

router.route('/').get((req, res) => {
  new User()
    .fetch()
    .then((result) => {
      // respond with all users
      return res.json(result);
    })
    .catch((err) => {
      return res.status(500).send('Server error');
    });
});

module.exports = router;
