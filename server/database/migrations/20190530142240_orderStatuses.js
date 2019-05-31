exports.up = function(knex, Promise) {
  return knex.schema.createTable('orderStatuses', (table) => {
    table.increments();
    table
      .string('statusName', 30)
      .notNull()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orderStatuses');
};
