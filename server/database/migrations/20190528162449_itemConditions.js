exports.up = function(knex, Promise) {
  return knex.schema.createTable('itemConditions', (table) => {
    table.increments();
    table
      .string('conditionName', 30)
      .notNull()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('itemConditions');
};
