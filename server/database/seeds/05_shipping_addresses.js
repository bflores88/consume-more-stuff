exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shipping_addresses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('shipping_addresses').insert([
        {
          street: '123 Easy Street',
          apt_suite: '',
          city: 'Honolulu',
          state: 'HI',
          country: 'USA',
          zip: '12345',
          user_id: '1',
        },
        {
          street: '123 Sesame Street',
          apt_suite: '',
          city: 'Carson City',
          state: 'NV',
          country: 'USA',
          zip: '12345',
          user_id: '2',
        },
        {
          street: '123 Kenya Street',
          apt_suite: 'Suite A',
          city: 'Gotham City',
          state: 'WA',
          country: 'USA',
          zip: '12345',
          user_id: '3',
        },
        {
          street: '123 Malaysia Street',
          apt_suite: 'Apt 202',
          city: 'Marshmallow',
          state: 'NJ',
          country: 'USA',
          zip: '12345',
          user_id: '4',
        },
        {
          street: '123 Dakka Dakka Lane',
          apt_suite: '',
          city: 'Milwaukee',
          state: 'TX',
          country: 'USA',
          zip: '12345',
          user_id: '5',
        },
        {
          street: '123 Durka Dur Street',
          apt_suite: '',
          city: 'Canton',
          state: 'OH',
          country: 'USA',
          zip: '12345',
          user_id: '6',
        },
      ]);
    });
};
