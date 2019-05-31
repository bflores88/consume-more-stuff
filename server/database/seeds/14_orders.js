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
          orderStatus_id: 4,
          orderQuantity: 1,
          shippingCost: 12.95,
        },
        {
          transaction_id: 1,
          item_id: 5,
          orderStatus_id: 4,
          orderQuantity: 2,
          shippingCost: 4.99,
        },
      ]);
    });
};
