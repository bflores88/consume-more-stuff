'use strict';

const express = require('express');
const router = express.Router();
const CartedItem = require('../database/models/CartedItem');
const Item = require('../database/models/Item');

const knex = require('../database/knex.js');

router.route('/').get((req, res) => {
  knex
    .raw(
      `SELECT carted_items.*,
        items.name AS item_name, items.dimensions, items.price,
        items.shipping_cost, items.description AS item_description,
        item_images.image_link AS item_image,
        users.username AS seller, users.profile_image_url AS seller_profile_image,
        payment_cards.card_number, payment_cards.expiration, payment_cards.cvv,
        payment_cards.street AS billing_street,
        payment_cards.apt_suite AS billing_apt_suite,
        payment_cards.city AS billing_city,
        payment_cards.state AS billing_state,
        payment_cards.country AS billing_country,
        payment_cards.zip AS billing_zip,
        shipping_addresses.street AS shipping_street,
        shipping_addresses.apt_suite AS shipping_apt_suite,
        shipping_addresses.city AS shipping_city,
        shipping_addresses.state AS shipping_state,
        shipping_addresses.country AS shipping_country,
        shipping_addresses.zip AS shipping_zip
      FROM carted_items
      INNER JOIN items ON items.id = carted_items.item_id
      INNER JOIN item_images ON item_images.item_id = carted_items.item_id
      INNER JOIN users ON users.id = items.user_id
      INNER JOIN payment_cards ON payment_cards.user_id = users.id
      INNER JOIN shipping_addresses ON shipping_addresses.user_id = users.id
      WHERE carted_by = ?`,
      [req.user.id],
    )
    .then((result) => {
      // user's carted_items, payment methods, and shipping addresses
      return res.json(result.rows);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Cart not found');
    });
});

module.exports = router;
