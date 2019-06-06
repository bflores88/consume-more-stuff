exports.up = function(knex, Promise) {
  return knex.schema.alterTable('shipping_addresses', (table) => {
    table.boolean('active').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('shipping_addresses', (table) => {
    table.dropColumn('active');
  });
};
