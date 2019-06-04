const bookshelf = require('../bookshelf');

require('./User');
require('./Item');
class CartedItem extends bookshelf.Model {
  get tableName() {
    return 'cartedItems';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'carted_by');
  }

  transactions() {
    return this.belongsTo('Item', 'item_id');
  }
}

module.exports = bookshelf.model('CartedItem', CartedItem);
