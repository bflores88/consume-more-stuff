exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('themes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('themes').insert([
        { theme_name: 'filler', background_color: 'filler', font_style: 'filler', border_style: 'filler' },
      ]);
    });
};
