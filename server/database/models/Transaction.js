const bookshelf = require('../bookshelf');

require('./User');
require('./ShippingAddress');
class Transaction extends bookshelf.Model {
  get tableName() {
    return 'transactions';
  }
  get hasTimestamps() {
    return true;
  }

  user_id() {
    return this.belongsTo('User', 'user_id');
  }
  shippingAddress_id() {
    return this.belongsTo('ShippingAddress', 'shippingAddress_id');
  }
}

module.exports = bookshelf.model('Transaction', Transaction);
