const bookshelf = require('../bookshelf');

require('./User');
require('./Message');
class UserMessage extends bookshelf.Model {
  get tableName() {
    return 'users_messages';
  }
  get hasTimestamps() {
    return true;
  }

  sent_to() {
    return this.belongsTo('User', 'sent_to');
  }

  messages() {
    return this.belongsTo('Message', 'message_id');
  }
}

module.exports = bookshelf.model('UserMessage', UserMessage);
