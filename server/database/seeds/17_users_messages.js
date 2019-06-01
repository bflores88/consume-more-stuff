exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_messages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users_messages').insert([
        { message_id: 1, sent_to: 2 },
        { message_id: 2, sent_to: 1 },
        { message_id: 3, sent_to: 2 },
        { message_id: 3, sent_to: 5 },
        { message_id: 4, sent_to: 1 },
        { message_id: 4, sent_to: 2 },
        { message_id: 4, sent_to: 4 },
        { message_id: 4, sent_to: 5 },
        { message_id: 4, sent_to: 6 },
        { message_id: 5, sent_to: 3 },
      ]);
    });
};
