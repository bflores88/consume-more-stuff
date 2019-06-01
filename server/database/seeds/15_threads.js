exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('threads')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('threads').insert([
        { subject: 'Testing out the message feature on Savannah!' },
        { subject: 'I want everyone to know!!' },
      ]);
    });
};
