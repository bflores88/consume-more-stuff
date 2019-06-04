'use strict';

const express = require('express');
const router = express.Router();
const CartedItem = require('../database/models/CartedItem');
const Item = require('../database/models/Item');

const knex = require('../database/knex.js');

router
  .route('/')
  .get((req, res) => {
    knex
      .raw(
        `SELECT carted_items.*,
          items.name AS item_name, items.dimensions, items.price,
          items.shipping_cost, items.description AS item_description,
          item_images.image_link AS item_image,
          users.username AS seller, users.profile_image_url AS seller_profile_image
        FROM carted_items
        INNER JOIN items ON items.id = carted_items.item_id
        INNER JOIN item_images ON item_images.item_id = carted_items.item_id
        INNER JOIN users ON users.id = items.user_id
        WHERE carted_by = ?`,
        [req.user.id],
      )
      .then((result) => {
        /* Returns a cart owned by req.user.id
           with associated items, where the item
           name, dimensions, price, shipping cost,
           description and image links were renamed.
        */
        return res.json(result.rows);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Cart not found');
      });
  })
  .post((req, res) => {
    CartedItem.where({ carted_by: req.user.id, item_id: parseInt(req.body.item_id) })
      .fetch()
      .then((result) => {
        if (result !== null) {
          return res.status(400).send(`Item already in users cart`);
        }
        
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

router
  .route('/:id')
  .put((req, res) => {
    CartedItem.where({ id: parseInt(req.params.id) })
      .fetch({ withRelated: ['items'] })
      .then((result) => {
        if (req.body.quantity > result.toJSON().items.inventory) {
          return res.status(400).send('Order quantity exceeds inventory');
        }

        return new CartedItem('id', req.params.id)
          .save({
            quantity: req.body.quantity,
          })
          .then((result) => {
            return CartedItem.where({ carted_by: req.user.id })
              .fetchAll()
              .then((result) => {
                return res.json(result);
              });
          });
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  })
  .delete((req, res) => {
    CartedItem.where({ id: req.params.id })
      .destroy()
      .then(() => {
        return CartedItem.where({ carted_by: req.user.id })
          .fetchAll()
          .then((result) => {
            return res.json(result);
          });
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  });

module.exports = router;
