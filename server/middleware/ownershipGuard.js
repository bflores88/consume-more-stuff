'use strict';

module.exports = function(req, res, next) {
  if (req.user.id === parseInt(req.params.id)) {
    console.log('Ownership Guard Let Me Through');
    return next();
  } else {
    if (req.user.role_id === 1) {
      console.log('Ownership Guard Let Me Through');
      return next();
    } else {
      return res.send('Ownership Guard says not authorized');
    }
  }
};
