exports.up = function(knex, Promise) {
  return knex.schema.createTable('carted_items', (table) => {
    table.increments();
    table
      .integer('item_id')
      .notNull()
      .references('id')
      .inTable('items')
      .onDelete('CASCADE');
    table
      .integer('carted_by')
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('quantity').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('carted_items');
};
