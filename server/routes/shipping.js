'use strict';

const express = require('express');
const router = express.Router();
const ShippingAddress = require('../database/models/ShippingAddress');

router.route('/').get((req, res) => {
  ShippingAddress.where({ user_id: req.user.id })
    .fetchAll({ withRelated: ['states'] })
    .then((result) => {
      // respond with all shipping addresses
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
