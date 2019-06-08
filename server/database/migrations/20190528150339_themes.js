exports.up = function(knex, Promise) {
  return knex.schema.createTable('themes', (table) => {
    table.increments();
    table
      .string('theme_name', 30)
      .notNull()
      .unique();
    table.string('background_color', 100).notNull();
    table.string('font_style', 100).notNull();
    table.string('border_style', 100).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('themes');
};
