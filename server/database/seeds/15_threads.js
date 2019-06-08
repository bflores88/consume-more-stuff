exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('threads')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('threads').insert([
        { subject: 'Testing out the message feature on Savannah!', read_only: false },
        { subject: 'I want everyone to know!!', read_only: false },
        { subject: 'Public Announcement', read_only: true },
      ]);
    });
};
