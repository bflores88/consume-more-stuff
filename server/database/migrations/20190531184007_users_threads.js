exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_threads', (table) => {
    table.increments();
    table
      .integer('sent_to')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('thread_id')
      .notNull()
      .references('id')
      .inTable('threads');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_threads');
};
