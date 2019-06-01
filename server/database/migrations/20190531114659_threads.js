exports.up = function(knex, Promise) {
  return knex.schema.createTable('threads', (table) => {
    table.increments();
    table.string('subject', 255);
    table.boolean('read_only').notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('threads');
};
