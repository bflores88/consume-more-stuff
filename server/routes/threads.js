'use strict';

const express = require('express');
const router = express.Router();
const Thread = require('../database/models/Thread');

const knex = require('../database/knex.js');

// make sure this works with req.user (works with req.params)
router.route('/').get((req, res) => {
  // subquery selects threads associated with user
  // top level query selects thread attributes & associated usernames
  // (from the subqueried threads)
  knex
    .raw(
      `SELECT threads.*, string_agg(users.username, ', ') AS user_list
      FROM users_threads
      INNER JOIN users ON users.id = users_threads.sent_to
      INNER JOIN threads ON threads.id = users_threads.thread_id
      WHERE users_threads.thread_id IN
        (SELECT threads.id
        FROM threads
        INNER JOIN users_threads ON users_threads.thread_id = threads.id
        WHERE users_threads.sent_to = ?)
      GROUP BY threads.id, threads.subject, threads.read_only`,
      [req.user.id],
    )
    .then((result) => {
      return res.json(result.rows);
    });
});

router.route('/:threadId').get((req, res) => {
  knex
    .raw(
      `SELECT DISTINCT messages.* 
      FROM users_threads
      INNER JOIN users ON users.id = users_threads.sent_to
      INNER JOIN threads ON threads.id = users_threads.thread_id
      INNER JOIN messages ON messages.thread_id = threads.id
      WHERE users_threads.sent_to = ? AND users_threads.thread_id = ?`,
      [req.user.id, req.params.threadId],
    )
    .then((result) => {
      return res.json(result.rows);
    });
});

module.exports = router;
