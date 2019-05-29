
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('itemStatuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('itemStatuses').insert([
        {statusName: 'Published'},
        {statusName: 'Sold'},
      ]);
    });
};
