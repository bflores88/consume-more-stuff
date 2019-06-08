'use strict';

const Item = require('../database/models/Item');

module.exports = function(req, res, next) {
  Item.where({ id: req.params.id })
    .fetch({ withRelated: ['users'] })
    .then((result) => {
      const itemUserId = result.toJSON().user_id;
      if (itemUserId === req.user.id || req.user.role_id === 1) {
        return next();
      } else {
        return res.send('You are not Authorized to view this page.');
      }
    });
};
