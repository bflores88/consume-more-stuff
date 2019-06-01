const bookshelf = require('../bookshelf');

require('./Message');
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
}

module.exports = bookshelf.model('Thread', Thread);
