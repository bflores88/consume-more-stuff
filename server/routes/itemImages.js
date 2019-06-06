'use strict';

const express = require('express');
const router = express.Router();
const ItemImage = require('../database/models/ItemImage');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');
const registeredUser = require('../middleware/isLoggedInGuard');
const itemOwnerGuard = require('../middleware/itemOwnerGuard');


router.route('/').get((req, res) => {
  new ItemImage()
    .fetchAll()
    .then((result) => {
      // returns all images of all items
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
      // uploads a new image to AWS bucket if the user is logged in
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
      // uploads a new image using links to AWS bucket if the user is logged in
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
      // returns all images for the requested item
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Item image not found');
    });
});

router
  .route('/:id')
  .get(registeredUser, itemOwnerGuard, (req, res) => {
    // return queried image
    new ItemImage({ id: req.params.id })
      .fetch()
      .then((result) => {
        // returns a single image based on its ID
        return res.json(result);
      })
      .catch((err) => {
        console.log('error:', err);
        return res.status(404).send('Item image not found');
      });
  })
  .delete(registeredUser, itemOwnerGuard, (req, res) => {
    ItemImage.where({ id: req.params.id })
      .destroy()
      .then((result) => {
        new ItemImage()
          .fetchAll({ columns: ['image_link'] })
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
