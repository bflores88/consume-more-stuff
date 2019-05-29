
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('paymentCards').del()
    .then(function () {
      // Inserts seed entries
      return knex('paymentCards').insert([
        {cardNumber: '1111-1111-1111-1111', expiration: '12/20', cvv: '123', street: '321 Easy Street', aptSuite: '', city: 'New York City', state: 'NY', country: 'USA', zip: '12345', user_id: 1},
        {cardNumber: '2222-2222-2222-2222', expiration: '11/20', cvv: '456', street: '1155 Buckey Road', aptSuite: '', city: 'Los Angeles', state: 'CA', country: 'USA', zip: '12345', user_id: 2},
        {cardNumber: '3333-3333-3333-3333', expiration: '10/20', cvv: '789', street: '1428 Elm Street', aptSuite: '', city: 'Chicago', state: 'IL', country: 'USA', zip: '12345', user_id: 3},
        {cardNumber: '4444-4444-4444-4444', expiration: '9/20', cvv: '012', street: '307A Kamani Street', aptSuite: '', city: 'Houston', state: 'TX', country: 'USA', zip: '12345', user_id: 4},
        {cardNumber: '5555-5555-5555-5555', expiration: '8/20', cvv: '345', street: '1630 Liholiho Street', aptSuite: '', city: 'Philadelphia', state: 'PA', country: 'USA', zip: '12345', user_id: 5},
        {cardNumber: '6666-6666-6666-6666', expiration: '7/20', cvv: '678', street: '123 Sesame Street', aptSuite: '', city: 'Pheonix', state: 'AZ', country: 'USA', zip: '12345', user_id: 6},
      ]);
    });
};
