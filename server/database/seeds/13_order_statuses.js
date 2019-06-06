exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('order_statuses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('order_statuses').insert([
        { status_name: 'Submitted' },
        { status_name: 'Canceled' },
        { status_name: 'Shipped' },
        { status_name: 'Delivered' },
      ]);
    });
};
