const express = require('express');
const router = express.Router();
const State = require('../database/models/State');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');

router.route('/').get(isLoggedInGuard, (req, res) => {
  new State()
    .orderBy('name', 'ASC')
    .fetchAll()
    .then((result) => {
      // respond with all states
      return res.json(result);
    })
    .catch((err) => {
      console.log('error:', err);
      return res.status(500).send('Server error');
    });
});

module.exports = router;
