const bookshelf = require('../bookshelf');

require('./User');
require('./ShippingAddress');
require('./Order');
class Transaction extends bookshelf.Model {
  get tableName() {
    return 'transactions';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'purchased_by');
  }

  shippingAddresses() {
    return this.belongsTo('ShippingAddress', 'shippingAddress_id');
  }

  orders() {
    return this.hasMany('Order', 'transaction_id');
  }
}

module.exports = bookshelf.model('Transaction', Transaction);
