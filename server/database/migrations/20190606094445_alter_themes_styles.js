exports.up = function(knex, Promise) {
  return knex.schema.alterTable('themes', (table) => {
    table.dropColumn('background_color');
    table.dropColumn('font_style');
    table.dropColumn('border_style');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('themes', (table) => {
    table.string('background_color', 100).notNull();
    table.string('font_style', 100).notNull();
    table.string('border_style', 100).notNull();
  });
};
