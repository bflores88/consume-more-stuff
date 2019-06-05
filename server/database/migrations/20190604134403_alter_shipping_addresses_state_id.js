exports.up = function(knex, Promise) {
  return knex.schema.alterTable('shipping_addresses', (table) => {
    table
      .integer('state_id')
      .notNull()
      .references('id')
      .inTable('states');
    table.dropColumn('state');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shipping_addresses');
};
