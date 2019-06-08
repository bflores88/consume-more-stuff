exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('roles').insert([{ role_name: 'Admin' }, { role_name: 'Moderator' }, { role_name: 'User' }]);
    });
};
