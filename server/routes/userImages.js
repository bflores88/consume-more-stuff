'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');

// AWS s3 middleware for posting images
// 'image' in upload.single() is the key-name that's referenced in the req.body object
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

// do we care if someone can get all the profile images?
router.route('/').get(isLoggedInGuard, (req, res) => {
  new User()
    .fetchAll({ columns: ['id', 'profileImageUrl'] })
    .then((result) => {
      // respond with all profile images
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Server error');
    });
});

// PUT image FILES (not links)
// AFTER TESTING:: remove /:userId  && change req.params.userId --> req.user.id
router.route('/upload/:userId').put(singleUpload, isLoggedInGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profileImageUrl: req.file.location,
    })
    .then((result) => {
      new User({ id: req.params.userId }).fetch({ columns: ['profileImageUrl'] }).then((result) => {
        // respond with updated profile image
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// PUT image LINKS (not files)
// AFTER TESTING:: remove /:userId  && change req.params.userId --> req.user.id
router.route('/link/:userId').put(isLoggedInGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profileImageUrl: req.body.imageLink,
    })
    .then((result) => {
      new User({ id: req.params.userId }).fetch({ columns: ['profileImageUrl'] }).then((result) => {
        // respond with updated profile image
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('error;', err);
    });
});

module.exports = router;
