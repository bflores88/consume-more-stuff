'use strict';

const express = require('express');
const router = express.Router();
const Order = require('../database/models/Order');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');

router.route('shipped/:orderId').put(isLoggedInGuard, (req, res) => {
  new Order('id', parseInt(req.params.orderId))
    .save({
      order_status_id: 3,
    })
    .then((result) => {
      // allows a seller to update shipping status
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

module.exports = router;
