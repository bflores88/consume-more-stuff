'use strict';

const express = require('express');
const router = express.Router();
const Item = require('../database/models/Item');

router
  .route('/')
  .get((req, res) => {
    new Item()
      .fetch()
      .then((result) => {
        const items = result.toJSON();
        // respond with all items
        return res.send(items);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item not found');
      });
  })
  .post((req, res) => {
    new Item()
      .save({
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        dimensions: req.body.dimensions,
        viewCount: 0,
        price: req.body.price,
        description: req.body.description,
        approved: false,
        category_id: req.body.category_id,
        subCategory_id: req.body.subCategory_id,
        condition_id: req.body.condition_id,
        status_id: req.body.status_id,
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
      .fetch()
      .then((result) => {
        const item = result.toJSON();
        return res.send(item);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item not found');
      });
  })
  .put((req, res) => {
    new Item('id', req.params.id)
      .save({
        name: req.body.name,
        quantity: parseInt(req.body.quantity),
        dimensions: req.body.dimensions,
        price: req.body.price,
        description: req.body.description,
        approved: req.body.approved,
        category_id: req.body.category_id,
        subCategory_id: req.body.subCategory_id,
        condition_id: req.body.condition_id,
        status_id: req.body.status_id,
      })
      .then((result) => {
        // respond with updated item
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
      });
  })
  .delete((req, res) => {
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

module.exports = router;
