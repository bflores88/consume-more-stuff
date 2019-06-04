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
    .fetchAll({ columns: ['id', 'profile_image_url'] })
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
router.route('/upload/:userId').put(singleUpload, isLoggedInGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.file.location,
    })
    .then((result) => {
      new User({ id: req.params.userId }).fetch({ columns: ['profile_image_url'] }).then((result) => {
        // respond with updated profile image
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// PUT image LINKS (not files)
router.route('/link/:userId').put(isLoggedInGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.body.image_link,
    })
    .then((result) => {
      new User({ id: req.params.userId }).fetch({ columns: ['profile_image_url'] }).then((result) => {
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
