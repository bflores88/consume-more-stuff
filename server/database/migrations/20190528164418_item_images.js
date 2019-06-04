exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_images', (table) => {
    table.increments();
    table.string('image_link', 255).notNull();
    table
      .integer('item_id')
      .notNull()
      .references('id')
      .inTable('items');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_images');
};
