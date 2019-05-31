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
      .integer('orderStatus_id')
      .notNull()
      .references('id')
      .inTable('orderStatuses');
    table.integer('orderQuantity').notNull();
    table.decimal('shippingCost', 8, 2).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
