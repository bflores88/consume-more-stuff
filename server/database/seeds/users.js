
const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {active: true, role_id: 1, theme_id: 1, username: 'Admin01', password: bcrypt.hash('password', saltRounds), name: 'Jack Sparrow', email: 'seaturtules@email.com', profileImageUrl: 'filler'},
        {active: false, role_id: 1, theme_id: 1, username: 'Admin02', password: bcrypt.hash('password', saltRounds), name: 'Hector Barbosa', email: 'theblackpearl@email.com', profileImageUrl: 'filler'},
        {active: true, role_id: 2, theme_id: 1, username: 'Moderator01', password: bcrypt.hash('password', saltRounds), name: 'Reptar, Destroyer of Worlds', email: 'rugrats@email.com', profileImageUrl: 'filler'},
        {active: false, role_id: 2, theme_id: 1, username: 'Moderator02', password: bcrypt.hash('password', saltRounds), name: 'Godzilla, The King of Monsters', email: 'ilovejapan@email.com', profileImageUrl: 'filler'},
        {active: true, role_id: 3, theme_id: 1, username: 'User01', password: bcrypt.hash('password', saltRounds), name: 'Sega Sanshiro', email: 'buysega@email.com', profileImageUrl: 'filler'},
        {active: false, role_id: 3, theme_id: 1, username: 'Moderator02', password: bcrypt.hash('password', saltRounds), name: 'Nuck Chorris', email: 'Roundhouse2daface@email.com', profileImageUrl: 'filler'},
      ]);
    });
};