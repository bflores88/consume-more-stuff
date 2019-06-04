'use strict';

module.exports = function(req, res, next) {
  if (req.user.role_id === 3 || req.user.role_id === 2 || req.user.role_id === 1) {
    console.log('User Guard Let Me Through');
    return next();
  } else {
    console.log('User Guard Blocked Me');
    return res.send('User Guard says not authorized');
  }
};
