const bookshelf = require('../bookshelf');

require('./PaymentCard');
require('./ShippingAddress');
class State extends bookshelf.Model {
  get tableName() {
    return 'states';
  }
  get hasTimestamps() {
    return true;
  }

  payment_cards() {
    return this.hasMany('PaymentCard', 'state_id');
  }

  shipping_addresses() {
    return this.hasMany('ShippingAddress', 'state_id');
  }
}

module.exports = bookshelf.model('State', State);
