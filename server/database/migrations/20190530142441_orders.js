exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table
      .integer('transaction_id')
      .notNull()
      .references('id')
      .inTable('transactions');
    table
      .integer('item_id')
      .notNull()
      .references('id')
      .inTable('items');
    table
      .integer('order_status_id')
      .notNull()
      .references('id')
      .inTable('order_statuses');
    table.integer('quantity').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
