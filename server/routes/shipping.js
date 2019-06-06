'use strict';

const express = require('express');
const router = express.Router();
const ShippingAddress = require('../database/models/ShippingAddress');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const shippingAddressGuard = require('../middleware/shippingAddressGuard');

router
  .route('/')
  .get(isLoggedInGuard, (req, res) => {
    ShippingAddress.where({ user_id: req.user.id })
      .orderBy('primary', 'DESC')
      .orderBy('id', 'ASC')
      .fetchAll({ withRelated: ['states'] })
      .then((result) => {
        // respond with all shipping addresses, sorted
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  })
  .post(isLoggedInGuard, (req, res) => {
    // get all of user's addresses
    ShippingAddress.where({ user_id: req.user.id })
      .fetchAll()
      .then((result) => {
        // if no addresses, set primary = true. Otherwise, false
        const primary = result.length > 0 ? false : true;
        // return posted address (next: get all of user's addresses)
        return new ShippingAddress().save({
          primary: primary,
          address_name: req.body.address_name,
          street: req.body.street,
          apt_suite: req.body.apt_suite,
          city: req.body.city,
          state_id: parseInt(req.body.state_id),
          country: req.body.country,
          zip: req.body.zip,
          user_id: parseInt(req.user.id),
        });
      })
      .then(() => {
        // return all of user's addresses, sorted (next: send response)
        return ShippingAddress.where({ user_id: req.user.id })
          .orderBy('primary', 'DESC')
          .orderBy('id', 'ASC')
          .fetchAll({ withRelated: ['states'] });
      })
      .then((result) => {
        // respond with all addresses
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  });

router.route('/:id').put(isLoggedInGuard, shippingAddressGuard, (req, res) => {
  // get all of user's addresses
  ShippingAddress.where({ user_id: req.user.id })
    .fetchAll()
    .then((result) => {
      if (result.length < 2) {
        throw new Error('Must have at least two addresses to change primary address.');
      }
      // return primary address (next: update 'primary' to false)
      return ShippingAddress.where({ user_id: req.user.id, primary: true }).fetch();
    })
    .then((result) => {
      // if trying to set primary address to primary: exit out.
      if (result.id === parseInt(req.params.id)) {
        throw new Error(`This is already the user's primary address`);
      }
      // return prior primary address to false (next: update requested 'primary' to true)
      return new ShippingAddress('id', result.id).save({
        primary: false,
      });
    })
    .then(() => {
      // return requested address as primrary (next: get all of user's addresses)
      return new ShippingAddress('id', parseInt(req.params.id)).save({
        primary: true,
      });
    })
    .then(() => {
      // return all of user's addresses, sorted (next: send response)
      return ShippingAddress.where({ user_id: req.user.id })
        .orderBy('primary', 'DESC')
        .orderBy('id', 'ASC')
        .fetchAll({ withRelated: ['states'] });
    })
    .then((result) => {
      // respond with all addresses
      return res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
