'use strict';

const PaymentCard = require('../database/models/PaymentCard');

module.exports = function(req, res, next) {
  PaymentCard.where({ id: req.params.id, active: true })
    .fetch()
    .then((result) => {
      // only convert to JSON if result not null
      let cardUserId;
      if (result) {
        cardUserId = result.toJSON().user_id;
      }

      if (cardUserId === parseInt(req.user.id)) {
        return next();
      } else {
        return res.send('You are not Authorized to view this.');
      }
    });
};
