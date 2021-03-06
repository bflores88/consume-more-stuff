exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('orders').insert([
        {
          transaction_id: 1,
          item_id: 5,
          order_status_id: 1,
          quantity: 2,
        },
        {
          transaction_id: 1,
          item_id: 3,
          order_status_id: 1,
          quantity: 1,
        },
        {
          transaction_id: 2,
          item_id: 4,
          order_status_id: 3,
          quantity: 3,
        },
        {
          transaction_id: 3,
          item_id: 1,
          order_status_id: 1,
          quantity: 1,
        },
        {
          transaction_id: 4,
          item_id: 1,
          order_status_id: 2,
          quantity: 1,
        },
        {
          transaction_id: 5,
          item_id: 1,
          order_status_id: 4,
          quantity: 1,
        },
        {
          transaction_id: 6,
          item_id: 1,
          order_status_id: 1,
          quantity: 1,
        },
      ]);
    });
};
