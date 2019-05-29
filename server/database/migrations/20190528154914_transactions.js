exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('shippingAddress_id')
      .notNull()
      .references('id')
      .inTable('shippingAddresses');
    table.integer('tax').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions');
};
