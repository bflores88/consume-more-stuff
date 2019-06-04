exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('transactions').insert([
        { purchased_by: 1, shippingAddress_id: 1, tax: 4.99 },
        { purchased_by: 2, shippingAddress_id: 2, tax: 4.99 },
        { purchased_by: 3, shippingAddress_id: 3, tax: 4.99 },
        { purchased_by: 4, shippingAddress_id: 4, tax: 4.99 },
        { purchased_by: 5, shippingAddress_id: 5, tax: 4.99 },
        { purchased_by: 6, shippingAddress_id: 6, tax: 4.99 },
      ]);
    });
};
