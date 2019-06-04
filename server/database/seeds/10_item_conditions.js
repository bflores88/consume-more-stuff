exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_conditions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('item_conditions').insert([
        { condition_name: 'New' },
        { condition_name: 'Good' },
        { condition_name: 'Fair' },
        { condition_name: 'Worn' },
        { condition_name: 'Used' },
      ]);
    });
};
