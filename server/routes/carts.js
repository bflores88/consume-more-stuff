'use strict';

const express = require('express');
const router = express.Router();
const CartedItem = require('../database/models/CartedItem');
const Item = require('../database/models/Item');

router
  .route('/')
  .get((req, res) => {
    CartedItem.where({ carted_by: req.user.id })
      .fetchAll()
      .then((result) => {
        // respond with all of user's carted_items
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Cart not found');
      });
  })
  .post((req, res) => {
    // make sure item not already in cart
    CartedItem.where({ carted_by: req.user.id, item_id: parseInt(req.body.item_id) })
      .fetch()
      .then((result) => {
        if (result !== null) {
          return res.status(400).send(`Item already in user's cart`);
        }

        // make sure item is valid
        return Item.where({ id: req.body.item_id })
          .fetch()
          .then((result) => {
            if (result === null) {
              return res.status(404).send('Item not found');
            }

            if (!result.toJSON().active || !result.toJSON().approved) {
              return res.status(400).send('Item not currently listed');
            }

            if (req.body.quantity > result.toJSON().inventory) {
              return res.status(400).send('Order quantity exceeds inventory');
            }

            return new CartedItem()
              .save({
                item_id: parseInt(req.body.item_id),
                carted_by: parseInt(req.user.id),
                quantity: req.body.quantity,
              })
              .then((result) => {
                new CartedItem({ id: result.id }).fetch().then((result) => {
                  return res.json(result);
                });
              });
          });
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  });

module.exports = router;
