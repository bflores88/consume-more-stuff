exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table
      .string('role_name', 30)
      .notNull()
      .unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
