const bookshelf = require('../bookshelf');

require('./Transaction');
require('./Item');
require('./OrderStatus');
class Order extends bookshelf.Model {
  get tableName() {
    return 'orders';
  }
  get hasTimestamps() {
    return true;
  }

  transactions() {
    return this.belongsTo('Transaction', 'transaction_id');
  }

  items() {
    return this.belongsTo('Item', 'item_id');
  }

  order_statuses() {
    return this.belongsTo('OrderStatus', 'order_status_id');
  }
}

module.exports = bookshelf.model('Order', Order);
