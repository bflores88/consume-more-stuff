exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shipping_addresses')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('shipping_addresses').insert([
        {
          primary: true,
          address_name: 'Jack Sparrow',
          street: '123 Easy Street',
          apt_suite: '',
          city: 'Honolulu',
          state_id: 12,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 1,
        },
        {
          primary: false,
          address_name: 'Jack Sparrow',
          street: '123 Kenya Street',
          apt_suite: 'Suite A',
          city: 'Gotham City',
          state_id: 33,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 1,
        },
        {
          primary: true,
          address_name: 'Hector Barbosa',
          street: '123 Sesame Street',
          apt_suite: '',
          city: 'Carson City',
          state_id: 29,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 2,
        },
        {
          primary: true,
          address_name: 'Godzilla',
          street: '123 Malaysia Street',
          apt_suite: 'Apt 202',
          city: 'Marshmallow',
          state_id: 34,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 4,
        },
        {
          primary: true,
          address_name: 'Sega Sanshiro',
          street: '123 Dakka Dakka Lane',
          apt_suite: '',
          city: 'Milwaukee',
          state_id: 50,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 5,
        },
        {
          primary: true,
          address_name: 'Chuck Norris',
          street: '123 Durka Dur Street',
          apt_suite: '',
          city: 'Canton',
          state_id: 36,
          country: 'USA',
          zip: '12345',
          active: true,
          user_id: 6,
        },
      ]);
    });
};
