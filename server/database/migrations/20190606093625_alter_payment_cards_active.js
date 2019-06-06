exports.up = function(knex, Promise) {
  return knex.schema.alterTable('payment_cards', (table) => {
    table.boolean('active').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('payment_cards', (table) => {
    table.dropColumn('active');
  });
};
