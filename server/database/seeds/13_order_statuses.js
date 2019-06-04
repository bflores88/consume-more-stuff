exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('order_statuses').insert([
        { status_name: 'Processing' },
        { status_name: 'Canceled' },
        { status_name: 'Declined' },
        { status_name: 'Accepted' },
      ]);
    });
};
