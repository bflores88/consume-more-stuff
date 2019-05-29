exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table
      .string('roleName', 30)
      .notNull()
      .unique();
    table.boolean('canBuy').notNull();
    table.boolean('canSell').notNull();
    table.boolean('canModify').notNull();
    table.boolean('canApprove').notNull();
    table.boolean('canSuspend').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
