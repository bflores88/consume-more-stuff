'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');

const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

router.route('/').get(isLoggedInGuard, (req, res) => {
  new User()
    .fetchAll({ columns: ['id', 'profile_image_url'] })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(404).send('Server error');
    });
});

router.route('/upload/:userId').put(isLoggedInGuard, singleUpload, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.file.location,
    })
    .then((result) => {
      new User({ id: req.params.userId }).fetch({ columns: ['profile_image_url'] }).then((result) => {
        return res.json(result);
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
});

router.route('/link/:userId').put(isLoggedInGuard, (req, res) => {
  new User('id', req.params.userId)
    .save({
      profile_image_url: req.body.image_link,
    })
    .then((result) => {
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
