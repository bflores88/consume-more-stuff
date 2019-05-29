
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('itemConditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('itemConditions').insert([
        {conditionName: 'New'},
        {conditionName: 'Good'},
        {conditionName: 'Fair'},
        {conditionName: 'Worn'},
        {conditionName: 'Used'},
      ]);
    });
};
