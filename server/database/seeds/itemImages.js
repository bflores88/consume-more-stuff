
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('itemImages').del()
    .then(function () {
      // Inserts seed entries
      return knex('itemImages').insert([
        {imageLink: 'test', item_id: 1},
        {imageLink: 'test', item_id: 2},
        {imageLink: 'test', item_id: 3},
        {imageLink: 'test', item_id: 4},
        {imageLink: 'test', item_id: 5},
        {imageLink: 'test', item_id: 6},
        {imageLink: 'test', item_id: 7},
        {imageLink: 'test', item_id: 8},
        {imageLink: 'test', item_id: 9},
        {imageLink: 'test', item_id: 10},
        {imageLink: 'test', item_id: 11},
        {imageLink: 'test', item_id: 12},
      ]);
    });
};
