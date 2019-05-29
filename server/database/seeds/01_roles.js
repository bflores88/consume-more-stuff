
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {roleName: 'Admin', canBuy: true, canSell: true, canModify: true, canApprove: true, canSuspend: true},
        {roleName: 'Moderator', canBuy:true, canSell: true, canModify: true, canApprove: true, canSuspend: false},
        {roleName: 'User', canBuy: true, canSell: true, canModify: false, canApprove: false, canSuspend: false},
      ]);
    });
};
