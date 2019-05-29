const bookshelf = require('../bookshelf');

require('./User');
class ShippingAddress extends bookshelf.Model {
  get tableName() {
    return 'shippingAddresses';
  }
  get hasTimestamps() {
    return true;
  }

  user_id() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('ShippingAddress', ShippingAddress);
