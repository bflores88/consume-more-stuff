exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('condition_id')
      .notNull()
      .references('id')
      .inTable('item_conditions');
    table
      .integer('category_id')
      .notNull()
      .references('id')
      .inTable('categories');
    table
      .integer('sub_category_id')
      .notNull()
      .references('id')
      .inTable('sub_categories');
    table.string('name', 255).notNull();
    table.integer('inventory').notNull();
    table.string('dimensions', 100);
    table.integer('view_count').notNull();
    table.decimal('price', 8, 2).notNull();
    table.decimal('shipping_cost', 8, 2).notNull();
    table.string('description', 1000);
    table.boolean('active').notNull();
    table.boolean('approved').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
