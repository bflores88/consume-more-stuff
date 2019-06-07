'use strict';

const express = require('express');
const router = express.Router();
const PaymentCard = require('../database/models/PaymentCard');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const paymentCardGuard = require('../middleware/paymentCardGuard');

router
  .route('/')
  .get(isLoggedInGuard, (req, res) => {
    PaymentCard.where({ user_id: req.user.id })
      .orderBy('primary', 'DESC')
      .orderBy('id', 'ASC')
      .fetchAll({ withRelated: ['states'] })
      .then((result) => {
        // respond with all payment cards, sorted
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  })
  .post(isLoggedInGuard, (req, res) => {
    // get all of user's cards
    PaymentCard.where({ user_id: req.user.id })
      .fetchAll()
      .then((result) => {
        // if no cards, set primary = true. Otherwise, false
        const primary = result.length > 0 ? false : true;
        // return posted card (next: get all of user's cards)
        return new PaymentCard().save({
          primary: primary,
          active: true,
          card_name: req.body.card_name,
          card_number: req.body.card_number,
          expiration: req.body.expiration,
          cvv: req.body.cvv,
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
        // return all of user's cards, sorted (next: send response)
        return PaymentCard.where({ user_id: req.user.id })
          .orderBy('primary', 'DESC')
          .orderBy('id', 'ASC')
          .fetchAll({ withRelated: ['states'] });
      })
      .then((result) => {
        // respond with all payment cards
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(500).send('Server error');
      });
  });

router.route('/:id').put(isLoggedInGuard, paymentCardGuard, (req, res) => {
  // get all of user's cards
  PaymentCard.where({ user_id: req.user.id })
    .fetchAll()
    .then((result) => {
      if (result.length < 2) {
        throw new Error('Must have at least two credit cards to change primary card.');
      }
      // return primary credit card (next: update 'primary' to false)
      return PaymentCard.where({ user_id: req.user.id, primary: true }).fetch();
    })
    .then((result) => {
      // if trying to set primary card to primary: exit out.
      if (result.id === parseInt(req.params.id)) {
        throw new Error(`This is already the user's primary card`);
      }
      // return prior primary card to false (next: update requested 'primary' to true)
      return new PaymentCard('id', result.id).save({
        primary: false,
      });
    })
    .then(() => {
      // return requested card as primrary (next: get all of user's cards)
      return new PaymentCard('id', parseInt(req.params.id)).save({
        primary: true,
      });
    })
    .then(() => {
      // return all of user's cards, sorted (next: send response)
      return PaymentCard.where({ user_id: req.user.id })
        .orderBy('primary', 'DESC')
        .orderBy('id', 'ASC')
        .fetchAll({ withRelated: ['states'] });
    })
    .then((result) => {
      // respond with all payment cards
      return res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
