exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table
      .string('role_name', 30)
      .notNull()
      .unique();
    table.boolean('can_buy').notNull();
    table.boolean('can_sell').notNull();
    table.boolean('can_modify').notNull();
    table.boolean('can_approve').notNull();
    table.boolean('can_suspend').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
