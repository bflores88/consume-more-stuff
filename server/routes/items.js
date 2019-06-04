'use strict';

const express = require('express');
const router = express.Router();
const Item = require('../database/models/Item');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const ownershipGuard = require('../middleware/ownershipGuard');
const isAdminGuard = require('../middleware/isAdminGuard');
const isModeratorGuard = require('../middleware/isModeratorGuard');

//no guard below
router.route('/active').get((req, res) => {
  Item.where({ active: true })
    .fetchAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router
  .route('/')
  .get(isLoggedInGuard, (req, res) => {
    new Item()
      .fetchAll()
      .then((result) => {
        // respond with all items
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item not found');
      });
  })
  .post(isLoggedInGuard, (req, res) => {
    new Item()
      .save({
        name: req.body.name,
        inventory: parseInt(req.body.inventory),
        dimensions: req.body.dimensions,
        view_count: 0,
        price: req.body.price,
        description: req.body.description,
        approved: true,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        condition_id: req.body.condition_id,
        active: req.body.active,
        user_id: parseInt(req.user.id),
      })
      .then((result) => {
        new Item({ id: result.id }).fetch().then((result) => {
          const item = result.toJSON();
          // respond with newly created item
          return res.json(item);
        });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    new Item({ id: req.params.id })
      .fetch({ withRelated: ['users', 'conditions', 'categories', 'sub_categories', 'images'] })
      .then((result) => {
        /* take result and parse out information we want
        and format it similarly to res.json(result) */
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item not found');
      });
  })
  .put(isLoggedInGuard, ownershipGuard, (req, res) => {
    new Item('id', req.params.id)
      .save({
        name: req.body.name,
        inventory: parseInt(req.body.inventory),
        dimensions: req.body.dimensions,
        price: req.body.price,
        description: req.body.description,
        approved: req.body.approved,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        condition_id: req.body.condition_id,
        active: req.body.active,
      })
      .then((result) => {
        // respond with updated item
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  })
  .delete(isLoggedInGuard, ownershipGuard, (req, res) => {
    Item.where({ id: req.params.id })
      .destroy()
      .then((result) => {
        // respond with successful delete message
        return res.send('successful delete');
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/:id/views').put((req, res) => {
  new Item({ id: req.params.id })
    .fetch()
    .then((item) => {
      let increment = ++item.attributes.view_count;
      item
        .save({ view_count: increment }, { patch: true })
        .then(() => {
          return res.json({ success: true });
        })
        .catch((err) => {
          console.log('error', err);
        });
    })
    .catch((err) => {
      console.log('error', err);
    });
});

module.exports = router;
