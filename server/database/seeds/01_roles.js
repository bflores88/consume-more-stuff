exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('roles').insert([
        { role_name: 'Admin', can_buy: true, can_sell: true, can_modify: true, can_approve: true, can_suspend: true },
        {
          role_name: 'Moderator',
          can_buy: true,
          can_sell: true,
          can_modify: true,
          can_approve: true,
          can_suspend: false,
        },
        { role_name: 'User', can_buy: true, can_sell: true, can_modify: false, can_approve: false, can_suspend: false },
      ]);
    });
};
