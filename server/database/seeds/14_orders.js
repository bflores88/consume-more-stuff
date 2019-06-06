exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('orders').insert([
        {
          transaction_id: 3,
          item_id: 1,
          order_status_id: 1,
          quantity: 1,
        },
        {
          transaction_id: 1,
          item_id: 5,
          order_status_id: 1,
          quantity: 2,
        },
      ]);
    });
};
