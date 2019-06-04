exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('carted_items')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('carted_items').insert([
        { item_id: 19, carted_by: 5, quantity: 3 },
        { item_id: 6, carted_by: 5, quantity: 1 },
        { item_id: 22, carted_by: 1, quantity: 2 },
      ]);
    });
};
