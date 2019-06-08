const bookshelf = require('../bookshelf');

require('./Message');
require('./UserThread');
class Thread extends bookshelf.Model {
  get tableName() {
    return 'threads';
  }
  get hasTimestamps() {
    return true;
  }

  messages() {
    return this.hasMany('Message', 'thread_id');
  }

  users_threads() {
    return this.hasMany('UserThread', 'thread_id');
  }
}

module.exports = bookshelf.model('Thread', Thread);
