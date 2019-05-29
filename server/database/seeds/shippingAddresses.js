
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shippingAddresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('shippingAddresses').insert([
        {street: '123 Easy Street', aptSuite: '', city: 'Honolulu', state: 'HI', country: 'USA', zip: '12345', user_id: '1'},
        {street: '123 Sesame Street', aptSuite: '', city: 'Carson City', state: 'PA', country: 'USA', zip: '12345', user_id: '2'},
        {street: '123 Kenya Street', aptSuite: 'Suite A', city: 'Gothem City', state: 'WA', country: 'USA', zip: '12345', user_id: '3'},
        {street: '123 Malaysia Street', aptSuite: 'Apt 202', city: 'Marshmellow', state: 'NJ', country: 'USA', zip: '12345', user_id: '4'},
        {street: '123 Dakka Dakka Lane', aptSuite: '', city: 'Milwalkee', state: 'TX', country: 'USA', zip: '12345', user_id: '5'},
        {street: '123 Durka Dur Street', aptSuite: '', city: 'Canton', state: 'VA', country: 'USA', zip: '12345', user_id: '6'},
      ]);
    });
};