'use strict';

const express = require('express');
const router = express.Router();
const PaymentCard = require('../database/models/PaymentCard');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const itemOwnerGuard = require('../middleware/itemOwnerGuard');

router.route('/').get(isLoggedInGuard, (req, res) => {
  PaymentCard.where({ user_id: req.user.id })
    .fetchAll({ withRelated: ['states'] })
    .then((result) => {
      // respond with all payment cards
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
