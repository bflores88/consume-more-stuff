'use strict';

const express = require('express');
const router = express.Router();
const ItemImage = require('../database/models/ItemImage');

// AWS s3 middleware for posting images
// 'image' in upload.single() is the key-name that's referenced in the req.body object
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');
const registeredUser = require('../middleware/userGuard');
const ownershipGuard = require('../middleware/ownershipGuard');

// const remove = require('../services/image-delete');

router.route('/').get((req, res) => {
  new ItemImage()
    .fetchAll()
    .then((result) => {
      // respond with all images
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Item not found');
    });
});

// post image FILES (not links)
router.route('/upload/:itemId').post(singleUpload, registeredUser, ownershipGuard, (req, res) => {
  console.log('REQRGWGEGGEW', req);
  new ItemImage()
    .save({
      imageLink: req.file.location,
      item_id: parseInt(req.params.itemId),
    })
    .then((result) => {
      new ItemImage({ id: result.id }).fetch().then((result) => {
        // respond with newly created item image
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// post image LINKS (not files)
router.route('/link/:itemId').post(registeredUser, ownershipGuard, (req, res) => {
  new ItemImage()
    .save({
      imageLink: req.body.imageLink,
      item_id: parseInt(req.params.itemId),
    })
    .then((result) => {
      new ItemImage({ id: result.id }).fetch().then((result) => {
        // respond with newly created item image
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
      return res.send('error;', err);
    });
});

router.route('/item/:itemId').get((req, res) => {
  // return only imageLinks for images tied to specified item
  ItemImage.where({ item_id: req.params.itemId })
    .fetchAll({ columns: ['imageLink'] })
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
  .get(registeredUser, ownershipGuard, (req, res) => {
    // return queried image
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
  .delete(registeredUser, ownershipGuard, (req, res) => {
    ItemImage.where({ id: req.params.id })
      .destroy()
      .then((result) => {
        new ItemImage()
          .fetchAll({ columns: ['imageLink'] })
          .then((result) => {
            // respond with all remaining images
            // BETTER would be to reply with all remaining images tied to item
            return res.json(result);
          })
          .catch((err) => {
            console.log('error:', err);
            return res.status(404).send('Item not found');
          });
      });
  });

module.exports = router;
