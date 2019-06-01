'use strict';

const express = require('express');
const router = express.Router();
const Category = require('../database/models/Category');

router.route('/')
  .get((req, res) => {
    Category
      .fetchAll({columns: ['id', 'categoryName']})
      .then((result) => {
        return res.json(result.toJSON())
      })
      .catch((err) => {
      console.log('error', err)
    })
  })

module.exports = router;