const bookshelf = require('../bookshelf');

require('./Order');
class OrderStatus extends bookshelf.Model {
  get tableName() {
    return 'order_statuses';
  }
  get hasTimestamps() {
    return true;
  }

  orders() {
    return this.hasMany('Order', 'order_status_id');
  }
}

module.exports = bookshelf.model('OrderStatus', OrderStatus);
