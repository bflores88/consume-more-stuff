exports.up = function(knex, Promise) {
  return knex.schema.createTable('itemImages', (table) => {
    table.increments();
    table.string('imageLink', 255).notNull();
    table
      .integer('item_id')
      .notNull()
      .references('id')
      .inTable('items');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('itemImages');
};
