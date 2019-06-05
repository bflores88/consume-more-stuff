'use strict';

module.export = function(req, res, next) {
    if (req.user.role_id === 2 || req.user.role_id === 1) {
        return next();
    } else {
        return res.send('You are not Authorized to view this page.')
    }
}