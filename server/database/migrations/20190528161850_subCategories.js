exports.up = function(knex, Promise) {
  return knex.schema.createTable('subCategories', (table) => {
    table.increments();
    table
      .string('subCategoryName', 30)
      .notNull()
      .unique();
    table
      .integer('category_id')
      .notNull()
      .references('id')
      .inTable('categories');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('subCategories');
};
