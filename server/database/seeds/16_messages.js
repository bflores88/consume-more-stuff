exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        {
          body: 'Hi friend,  I just wanted to test out messaging on this new Savannah platform.  It seems super cool!!',
          thread_id: 1,
          sent_by: 1,
        },
        {
          body: 'Good to hear from you Admin01!  I am glad they decided to add a messaging feature.  It is neat!',
          thread_id: 1,
          sent_by: 2,
        },
        {
          body: 'It sure is! What do you think User01?!?',
          thread_id: 1,
          sent_by: 1,
        },
        {
          body: 'Everyone should be listening to what I have to say!!',
          thread_id: 2,
          sent_by: 3,
        },
        {
          body: 'I also want to reply to everyone, sorry',
          thread_id: 2,
          sent_by: 4,
        },
        {
          body: 'Everyone please enjoy our newest feature, Public Announcements, on Savannah',
          thread_id: 3,
          sent_by: 1,
        },
      ]);
    });
};
