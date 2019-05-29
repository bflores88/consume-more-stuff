exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table
      .string('roleName', 30)
      .notNull()
      .unique();
    table.string('canBuy', 100).notNull();
    table.string('canSell', 100).notNull();
    table.string('canModify', 100).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
