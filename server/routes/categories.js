'use strict';

const express = require('express');
const router = express.Router();
const Category = require('../database/models/Category');

router.route('/')
  .get((req, res) => {
    Category
      .forge()
      .orderBy('categoryName', 'ASC')
      .fetchAll({columns: ['id', 'categoryName'], withRelated: ['subCategories']})
      .then((result) => {
        return res.json(result.toJSON())
      })
      .catch((err) => {
      console.log('error', err)
    })
  })

router.route('/:category')
  .get((req, res) => {
    new Category({ categoryName: req.params.category })
      .fetch({withRelated: ['items']})
      .then((result) => {
        return res.json(result.toJSON())
      })
      .catch((err) => {
      console.log('error', err)
    })
  })

module.exports = router;