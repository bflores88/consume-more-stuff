'use strict';

const express = require('express');
const router = express.Router();
const Category = require('../database/models/Category');
const SubCategory = require('../database/models/SubCategory');
const Item = require('../database/models/Item');

//POST WILL NEED AN ADMIN GUARD
router
  .route('/')
  .get((req, res) => {
    Category.forge()
      .orderBy('category_name', 'ASC')
      .fetchAll({ columns: ['id', 'category_name'], withRelated: ['sub_categories', 'items'] })
      .then((result) => {
        return res.json(result.toJSON());
      })
      .catch((err) => {
        console.log('error', err);
      });
  })
  .post((req, res) => {
    new Category()
      .save({ category_name: req.body.category_name })
      .then((result) => {
        const category_id = result.id;
        const newSubcategories = req.body.sub_categories;
        newSubcategories.forEach((subCat) => {
          subCat.category_id = category_id;
        });

        return SubCategory.collection(newSubcategories).invokeThen('save');
      })
      .catch((err) => {
        console.log('error', err);
      });
  });

router.route('/:category').get((req, res) => {
  new Category({ category_name: req.params.category })
    .fetch()
    .then((result) => {
      let catID = result.id;
      console.log('resulID', catID)

      return Item.where({ category_id: catID })
        .fetchAll({withRelated: ['users']})
        .then((result) => {
          console.log(result.toJSON());
          return res.json(result.toJSON());
        
      })
      .catch((err) => {
        console.log('error', err);
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
});

router.route('/subcategories').post((req, res) => {
  return SubCategory.collection(req.body.sub_categories)
    .invokeThen('save')
    .then((result) => {
      return res.json(result.toJSON());
    });
});

module.exports = router;
