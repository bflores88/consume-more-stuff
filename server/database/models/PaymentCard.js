const bookshelf = require('../bookshelf');

require('./User');
class PaymentCard extends bookshelf.Model {
  get tableName() {
    return 'payment_cards';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('PaymentCard', PaymentCard);
