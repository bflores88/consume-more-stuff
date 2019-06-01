const bookshelf = require('../bookshelf');

require('./User');
require('./Thread');
require('./UserMessage');
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

  users_messages() {
    return this.hasMany('UserMessage', 'message_id');
  }
}

module.exports = bookshelf.model('Message', Message);
