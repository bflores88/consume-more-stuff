exports.up = function(knex, Promise) {
  return knex.schema.createTable('states', (table) => {
    table.increments();
    table.string('postal_code', 2).notNull();
    table.string('name', 30).notNull();
    table.decimal('tax_rate', 8, 6).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('states');
};
