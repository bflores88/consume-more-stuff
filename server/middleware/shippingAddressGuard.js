'use strict';

const ShippingAddress = require('../database/models/ShippingAddress');

module.exports = function(req, res, next) {
  ShippingAddress.where({ id: req.params.id, active: true })
    .fetch()
    .then((result) => {
      // only convert to JSON if result not null
      let shipAddressUserId;
      if (result) {
        shipAddressUserId = result.toJSON().user_id;
      }

      if (shipAddressUserId === parseInt(req.user.id)) {
        return next();
      } else {
        return res.send('You are not Authorized to view this.');
      }
    });
};
