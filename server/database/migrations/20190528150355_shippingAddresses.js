exports.up = function(knex, Promise) {
  return knex.schema.createTable('shippingAddresses', (table) => {
    table.increments();
    table.string('street', 100);
    table.string('aptSuite', 20);
    table.string('city', 50);
    table.string('state', 20);
    table.string('country', 20);
    table.string('zip', 5);
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
  return knex.schema.dropTable('shippingAddresses');
};
