const bookshelf = require('../bookshelf');

require('./User');
require('./Thread');
class Message extends bookshelf.Model {
  get tableName() {
    return 'messages';
  }
  get hasTimestamps() {
    return true;
  }

  sent_by() {
    return this.belongsTo('User', 'sent_by');
  }

  threads() {
    return this.belongsTo('Thread', 'thread_id');
  }
}

module.exports = bookshelf.model('Message', Message);
