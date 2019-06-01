const bookshelf = require('../bookshelf');

require('./Theme');
require('./Role');
require('./Item');
require('./Message');
require('./UserThread');
require('./PaymentCard');
require('./ShippingAddress');
require('./Transaction');
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

  paymentCards() {
    return this.hasMany('PaymentCard', 'user_id');
  }

  shippingAddresses() {
    return this.hasMany('ShippingAddress', 'user_id');
  }

  transactions() {
    return this.hasMany('Transaction', 'user_id');
  }

  received_threads() {
    return this.hasMany('UserThread', 'sent_to');
  }
}

module.exports = bookshelf.model('User', User);
