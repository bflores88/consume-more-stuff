exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_conditions', (table) => {
    table.increments();
    table
      .string('condition_name', 30)
      .notNull()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_conditions');
};
