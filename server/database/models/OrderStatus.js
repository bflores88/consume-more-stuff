const bookshelf = require('../bookshelf');

require('./Order');
class OrderStatus extends bookshelf.Model {
  get tableName() {
    return 'orderStatuses';
  }
  get hasTimestamps() {
    return true;
  }

  orders() {
    return this.hasMany('Order', 'orderStatus_id');
  }
}

module.exports = bookshelf.model('OrderStatus', OrderStatus);
