exports.up = function(knex, Promise) {
  return knex.schema.createTable('shipping_addresses', (table) => {
    table.increments();
    table.boolean('primary').notNull();
    table.string('address_name', 100).notNull();
    table.string('street', 100).notNull();
    table.string('apt_suite', 20);
    table.string('city', 50).notNull();
    table.string('state', 20).notNull();
    table.string('country', 20).notNull();
    table.string('zip', 5).notNull();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shipping_addresses');
};
