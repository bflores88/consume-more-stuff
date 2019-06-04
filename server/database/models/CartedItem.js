const bookshelf = require('../bookshelf');

require('./User');
require('./Item');
class CartedItem extends bookshelf.Model {
  get tableName() {
    return 'carted_items';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'carted_by');
  }

  items() {
    return this.belongsTo('Item', 'item_id');
  }
}

module.exports = bookshelf.model('CartedItem', CartedItem);
