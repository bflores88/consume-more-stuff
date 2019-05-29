exports.up = function(knex, Promise) {
  return knex.schema.createTable('themes', (table) => {
    table.increments();
    table
      .string('themeName', 30)
      .notNull()
      .unique();
    table.string('backgroundColor', 100).notNull();
    table.string('fontStyle', 100).notNull();
    table.string('borderStyle', 100).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('themes');
};
