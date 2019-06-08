exports.up = function(knex, Promise) {
  return knex.schema.alterTable('payment_cards', (table) => {
    table
      .integer('state_id')
      .notNull()
      .references('id')
      .inTable('states');
    table.dropColumn('state');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('payment_cards', (table) => {
    table.string('state', 20).notNull();
    table.dropColumn('state_id');
  });
};
