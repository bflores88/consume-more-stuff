const bookshelf = require('../bookshelf');

require('./Theme');
require('./Role');
require('./Item');
require('./Message');
require('./UserThread');
require('./PaymentCard');
require('./ShippingAddress');
require('./Transaction');
require('./CartedItem');
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  roles() {
    return this.belongsTo('Role', 'role_id');
  }

  themes() {
    return this.belongsTo('Theme', 'theme_id');
  }

  items() {
    return this.hasMany('Item', 'user_id');
  }

  sent_messages() {
    return this.hasMany('Message', 'sent_by');
  }

  payment_cards() {
    return this.hasMany('PaymentCard', 'user_id');
  }

  shipping_addresses() {
    return this.hasMany('ShippingAddress', 'user_id');
  }

  carted_items() {
    return this.hasMany('CartedItem', 'carted_by');
  }

  transactions() {
    return this.hasMany('Transaction', 'purchased_by');
  }

  received_threads() {
    return this.hasMany('UserThread', 'sent_to');
  }
}

module.exports = bookshelf.model('User', User);
