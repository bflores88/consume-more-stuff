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
      .integer('status_id')
      .notNull()
      .references('id')
      .inTable('itemStatuses');
    table
      .integer('condition_id')
      .notNull()
      .references('id')
      .inTable('itemConditions');
    table
      .integer('category_id')
      .notNull()
      .references('id')
      .inTable('categories');
    table
      .integer('subCategory_id')
      .notNull()
      .references('id')
      .inTable('subCategories');
    table.string('name', 255).notNull();
    table.integer('quantity').notNull();
    table.string('dimensions', 100);
    table.integer('viewCount').notNull();
    table.decimal('price', 8, 2).notNull();
    table.string('description', 1000);
    table.boolean('approved').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
