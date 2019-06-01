exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_threads')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_threads').insert([
        { thread_id: 1, sent_to: 1 },
        { thread_id: 1, sent_to: 2 },
        { thread_id: 1, sent_to: 5 },
        { thread_id: 2, sent_to: 3 },
        { thread_id: 2, sent_to: 4 },
        { thread_id: 3, sent_to: 1 },
        { thread_id: 3, sent_to: 2 },
        { thread_id: 3, sent_to: 3 },
        { thread_id: 3, sent_to: 4 },
        { thread_id: 3, sent_to: 5 },
        { thread_id: 3, sent_to: 6 },
      ]);
    });
};
