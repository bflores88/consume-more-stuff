exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('status_id')
      .notNull()
      .references('id')
      .inTable('itemStatuses');
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
    table.integer('tax').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
