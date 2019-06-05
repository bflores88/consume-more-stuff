'use strict';

const express = require('express');
const router = express.Router();
const Thread = require('../database/models/Thread');
const Message = require('../database/models/Message');
const UserThread = require('../database/models/UserThread');
const isLoggedInGuard = require('../middleware/isLoggedInGuard');
const itemOwnerGuard = require('../middleware/itemOwnerGuard');
const isModeratorGuard = require('../middleware/isModeratorGuard');
const isAdminGuard = require('../middleware/isAdminGuard');

const knex = require('../database/knex.js');

router
  .route('/')
  .get(isLoggedInGuard, (req, res) => {
    knex
      .raw(
        `SELECT a.*, MAX(messages.id) AS max_message_id
        FROM
          (SELECT threads.*, string_agg(users.username, ', ') AS user_list
            FROM threads
            INNER JOIN users_threads ON users_threads.thread_id = threads.id
            INNER JOIN users ON users.id = users_threads.sent_to
            WHERE threads.id IN
              (SELECT threads.id
              FROM threads
              INNER JOIN users_threads ON users_threads.thread_id = threads.id
              WHERE users_threads.sent_to = ?)
            GROUP BY threads.id, threads.subject, threads.read_only) a
          INNER JOIN messages ON messages.thread_id = a.id
          GROUP BY a.id, a.subject, a.read_only, a.user_list, a.created_at, a.updated_at
          ORDER BY max_message_id DESC`,
        [req.user.id],
      )
      .then((result) => {    
        // inner most subquery selects threads associated with the user
        // outer subquery selects those threads' attributes (incl list of users sent_to)
        // top level query joins & sorts by most recent message
        return res.json(result.rows);
      });
  })
  .post(isLoggedInGuard, (req, res) => {
    new Thread()
      .save({
        subject: req.body.subject,
        read_only: req.body.read_only,
      })
      .then((result) => {
        // creates the first message associated with the thread
        new Message()
          .save({
            body: req.body.body,
            thread_id: result.id,
            sent_by: req.user.id,
          })
          .then((result) => {
            // adds sender to the thread
            const thread_id = result.attributes.thread_id;
            let usersThreads = [
              {
                thread_id: thread_id,
                sent_to: req.user.id,
              },
            ];
            // adding additional recipients to the thread
            const userList = req.body.userList;
            if (userList.length > 0) {
              userList.forEach((user) => {
                usersThreads.push({
                  thread_id: thread_id,
                  sent_to: parseInt(user),
                });
              });
            }

            UserThread.collection(usersThreads)
              .invokeThen('save')
              .then((result) => {
                knex
                  .raw(
                    `SELECT
                      messages.id AS message_id,
                      messages.sent_by AS sent_by_user_id,
                      users.username AS sent_by_username,
                      messages.body,
                      messages.thread_id,
                      messages.created_at,
                      messages.updated_at
                    FROM messages
                    INNER JOIN users ON users.id = messages.sent_by
                    INNER JOIN users_threads ON users_threads.thread_id = messages.thread_id
                    WHERE users_threads.sent_to = ? AND messages.thread_id = ?
                    ORDER BY message_id`,
                    [req.user.id, result[0].attributes.thread_id],
                  )
                  .then((result) => {
                    // replies with the first message on the thread
                    return res.json(result.rows);
                  });
              });
          });
      });
  });

router
  .route('/:threadId')
  .get(isLoggedInGuard, (req, res) => {
    // get all messages on a thread
    knex
      .raw(
        `SELECT
          messages.id AS message_id,
          messages.sent_by AS sent_by_user_id,
          users.username AS sent_by_username,
          messages.body,
          messages.thread_id,
          messages.created_at,
          messages.updated_at
        FROM messages
        INNER JOIN users ON users.id = messages.sent_by
        INNER JOIN users_threads ON users_threads.thread_id = messages.thread_id
        WHERE users_threads.sent_to = ? AND messages.thread_id = ?
        ORDER BY message_id`,
        [req.user.id, req.params.threadId],
      )
      .then((result) => {
        return res.json(result.rows);
      });
  })
  .post(isLoggedInGuard, (req, res) => {
    // creates a new message on a thread
    new Message()
      .save({
        body: req.body.body,
        thread_id: parseInt(req.params.threadId),
        sent_by: parseInt(req.user.id),
      })
      .then(() => {
        knex
          .raw(
            `SELECT
              messages.id AS message_id,
              messages.sent_by AS sent_by_user_id,
              users.username AS sent_by_username,
              messages.body,
              messages.thread_id,
              messages.created_at,
              messages.updated_at
            FROM messages
            INNER JOIN users ON users.id = messages.sent_by
            INNER JOIN users_threads ON users_threads.thread_id = messages.thread_id
            WHERE users_threads.sent_to = ? AND messages.thread_id = ?
            ORDER BY message_id`,
            [req.user.id, req.params.threadId],
          )
          .then((result) => {
            return res.json(result.rows);
          });
      })
      .catch((err) => {
        console.log('error:', err);
      });
  });

module.exports = router;
