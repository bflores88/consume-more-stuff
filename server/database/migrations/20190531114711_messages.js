exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('body', 1000);
    table
      .integer('thread_id')
      .notNull()
      .references('id')
      .inTable('threads')
      .onDelete('CASCADE');
    table
      .integer('sent_by')
      .notNull()
      .references('id')
      .inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
