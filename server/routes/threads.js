'use strict';

const express = require('express');
const router = express.Router();
const Thread = require('../database/models/Thread');
const Message = require('../database/models/Message');
const UserThread = require('../database/models/UserThread');
const registeredUser = require('../middleware/userGuard');
const ownershipGuard = require('../middleware/ownershipGuard');
const knex = require('../database/knex.js');

router
  .route('/')
  .get(registeredUser, ownershipGuard, (req, res)) => {
    // subquery selects threads associated with user
    // top level query selects thread attributes & associated usernames
    // (for each of the subqueried threads)
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
  })
  .post(registeredUser, ownershipGuard, (req, res) => {
    new Thread()
      .save({
        subject: req.body.subject,
        read_only: req.body.read_only,
      })
      .then((result) => {
        new Message()
          .save({
            body: req.body.body,
            thread_id: result.id,
            sent_by: req.user.id,
          })
          .then((result) => {
            new UserThread()
              .save({
                thread_id: result.attributes.thread_id,
                sent_to: req.user.id,
              })
              .then((result) => {
                const thread_id = result.attributes.thread_id;
                let usersThreads = [];
                req.body.userList.forEach((user) => {
                  usersThreads.push({
                    thread_id: thread_id,
                    sent_to: parseInt(user),
                  });
                });

                UserThread.collection(usersThreads)
                  .invokeThen('save')
                  .then((result) => {
                    knex
                      .raw(
                        `SELECT DISTINCT messages.* 
                        FROM users_threads
                        INNER JOIN users ON users.id = users_threads.sent_to
                        INNER JOIN threads ON threads.id = users_threads.thread_id
                        INNER JOIN messages ON messages.thread_id = threads.id
                        WHERE users_threads.sent_to = ? AND users_threads.thread_id = ?`,
                        [req.user.id, result[0].attributes.thread_id],
                      )
                      .then((result) => {
                        return res.json(result.rows);
                      });
                  });
              });
          });
      });
  });

router
  .route('/:threadId')
  .get(registeredUser, ownershipGuard, (req, res) => {
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
  })
  .post(registeredUser, ownershipGuard, (req, res) => {
    new Message()
      .save({
        body: req.body.body,
        thread_id: parseInt(req.params.threadId),
        sent_by: parseInt(req.user.id),
      })
      .then(() => {
        // after post, return the thread with the new message added
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
      })
      .catch((err) => {
        console.log('error:', err);
      });
  });

module.exports = router;
