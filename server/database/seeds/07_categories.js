exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        { category_name: 'Electronics' },
        { category_name: 'Apparel' },
        { category_name: 'Books' },
        { category_name: 'Movies' },
        { category_name: 'Food' },
      ]);
    });
};
