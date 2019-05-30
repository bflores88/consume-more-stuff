
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('themes').del()
    .then(function () {
      // Inserts seed entries
      return knex('themes').insert([
        {themeName: 'filler', backgroundColor: 'filler', fontStyle: 'filler', borderStyle: 'filler'},
      ]);
    });
};
