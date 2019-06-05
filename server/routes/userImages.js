'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const itemOwnerGuard = require('../middleware/itemOwnerGuard');
const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

router.route('/').get(isLoggedInGuard, (req, res) => {
  new User()
    .fetchAll({ columns: ['id', 'profile_image_url'] })
    .then((result) => {
      // returns the current users profile picture
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Server error');
    });
});

// PUT image FILES (not links)
router.route('/upload/:userId').put(isLoggedInGuard, singleUpload, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.file.location,
    })
    .then((result) => {
      /* allows the current user to change
         their profile picture using a png or jpeg file
      */
      new User({ id: req.params.userId }).fetch({ columns: ['profile_image_url'] }).then((result) => {
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

// PUT image LINKS (not files)
router.route('/link/:userId').put(isLoggedInGuard, itemOwnerGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.body.image_link,
    })
    .then((result) => {
      /* allows the current user to change their
      profile picture using a hypertext link */
      new User({ id: req.params.userId }).fetch({ columns: ['profile_image_url'] }).then((result) => {
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('error;', err);
    });
});

module.exports = router;
