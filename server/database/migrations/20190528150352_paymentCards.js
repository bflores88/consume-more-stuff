exports.up = function(knex, Promise) {
  return knex.schema.createTable('paymentCards', (table) => {
    table.increments();
    table.string('cardNumber', 20).notNull();
    table.date('expiration');
    table.string('ccv', 3);
    table.string('street', 100);
    table.string('aptSuite', 100);
    table.string('city', 100);
    table.string('state', 100);
    table.string('country', 100);
    table.string('zip', 100);
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
  return knex.schema.dropTable('paymentCards');
};
