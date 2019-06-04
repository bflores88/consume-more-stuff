exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_statuses', (table) => {
    table.increments();
    table
      .string('status_name', 30)
      .notNull()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_statuses');
};
