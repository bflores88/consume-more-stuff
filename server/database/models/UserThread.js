const bookshelf = require('../bookshelf');

require('./User');
require('./Thread');
class UserThread extends bookshelf.Model {
  get tableName() {
    return 'users_threads';
  }
  get hasTimestamps() {
    return true;
  }

  sent_to() {
    return this.belongsTo('User', 'sent_to');
  }

  threads() {
    return this.belongsTo('Thread', 'thread_id');
  }
}

module.exports = bookshelf.model('UserThread', UserThread);
