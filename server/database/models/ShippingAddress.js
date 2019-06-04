const bookshelf = require('../bookshelf');

require('./User');
require('./Transaction');
class ShippingAddress extends bookshelf.Model {
  get tableName() {
    return 'shipping_addresses';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  transactions() {
    return this.hasMany('Transaction', 'shipping_address_id');
  }
}

module.exports = bookshelf.model('ShippingAddress', ShippingAddress);
