'use strict';

const express = require('express');
const router = express.Router();
const ItemImage = require('../database/models/ItemImage');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const ownershipGuard = require('../middleware/ownershipGuard');

const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

router.route('/').get((req, res) => {
  new ItemImage()
    .fetchAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Item not found');
    });
});

router.route('/upload/:itemId').post(isLoggedInGuard, singleUpload, (req, res) => {
  new ItemImage()
    .save({
      image_link: req.file.location,
      item_id: parseInt(req.params.itemId),
    })
    .then((result) => {
      new ItemImage({ id: result.id }).fetch().then((result) => {
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/link/:itemId').post(isLoggedInGuard, (req, res) => {
  new ItemImage()
    .save({
      image_link: req.body.image_link,
      item_id: parseInt(req.params.itemId),
    })
    .then((result) => {
      new ItemImage({ id: result.id }).fetch().then((result) => {
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
      return res.send('error;', err);
    });
});

router.route('/item/:itemId').get((req, res) => {
  ItemImage.where({ item_id: req.params.itemId })
    .fetchAll({ columns: ['image_link'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Item image not found');
    });
});

router
  .route('/:id')
  .get((req, res) => {
    new ItemImage({ id: req.params.id })
      .fetch()
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item image not found');
      });
  })
  .delete(isLoggedInGuard, ownershipGuard, (req, res) => {
    ItemImage.where({ id: req.params.id })
      .destroy()
      .then((result) => {
        new ItemImage()
          .fetchAll({ columns: ['image_link'] })
          .then((result) => {
            return res.json(result);
          })
          .catch((err) => {
            console.log('error:', err);
            return res.status(404).send('Item not found');
          });
      });
  });

module.exports = router;
