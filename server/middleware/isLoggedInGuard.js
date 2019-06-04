'use strict';

module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('User Guard Blocked Me');
    return res.send('You are not Authorized to view this page.');
  }
};
