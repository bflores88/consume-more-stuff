exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_messages', (table) => {
    table.increments();
    table.string('body', 1000);
    table
      .integer('sent_to')
      .notNull()
      .references('id')
      .inTable('users');
    table
      .integer('message_id')
      .notNull()
      .references('id')
      .inTable('messages');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_messages');
};
