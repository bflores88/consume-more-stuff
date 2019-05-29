exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.boolean('active').notNull();
    table
      .integer('role_id')
      .notNull()
      .references('id')
      .inTable('roles');
    table
      .integer('theme_id')
      .notNull()
      .references('id')
      .inTable('themes');
    table
      .string('username', 20)
      .notNull()
      .unique();
    table.string('password', 100).notNull();
    table.string('name', 100);
    table.string('email', 100);
    table.string('profileImageUrl', 255);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
