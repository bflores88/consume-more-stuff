exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('transactions').insert([
        { purchased_by: 1, shipping_address_id: 1, payment_card_id: 1 },
        { purchased_by: 1, shipping_address_id: 2, payment_card_id: 2 },
        { purchased_by: 2, shipping_address_id: 3, payment_card_id: 3 },
        { purchased_by: 4, shipping_address_id: 4, payment_card_id: 4 },
        { purchased_by: 5, shipping_address_id: 5, payment_card_id: 5 },
        { purchased_by: 6, shipping_address_id: 6, payment_card_id: 6 },
      ]);
    });
};
