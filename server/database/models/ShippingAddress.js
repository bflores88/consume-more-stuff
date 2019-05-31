const bookshelf = require('../bookshelf');

require('./User');
class ShippingAddress extends bookshelf.Model {
  get tableName() {
    return 'shippingAddresses';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('ShippingAddress', ShippingAddress);
