exports.up = function(knex, Promise) {
  return knex.schema.createTable('payment_cards', (table) => {
    table.increments();
    table.string('card_number', 20).notNull();
    table.string('expiration', 6).notNull();
    table.string('cvv', 4).notNull();
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
  return knex.schema.dropTable('payment_cards');
};
