
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {user_id: 1, shippingAddress_id: 1, tax: 5.00},
        {user_id: 2, shippingAddress_id: 2, tax: 5.00},
        {user_id: 3, shippingAddress_id: 3, tax: 5.00},
        {user_id: 4, shippingAddress_id: 4, tax: 5.00},
        {user_id: 5, shippingAddress_id: 5, tax: 5.00},
        {user_id: 6, shippingAddress_id: 6, tax: 5.00},
      ]);
    });
};
