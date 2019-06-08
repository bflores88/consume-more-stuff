exports.up = function(knex, Promise) {
  return knex.schema.createTable('sub_categories', (table) => {
    table.increments();
    table
      .string('sub_category_name', 30)
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
  return knex.schema.dropTable('sub_categories');
};
