exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderStatuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('orderStatuses').insert([
        { statusName: 'Processing' },
        { statusName: 'Canceled' },
        { statusName: 'Declined' },
        { statusName: 'Accepted' },
      ]);
    });
};
