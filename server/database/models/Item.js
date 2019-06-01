const bookshelf = require('../bookshelf');

require('./User');
require('./ItemCondition');
require('./Category');
require('./SubCategory');
require('./Order');
require('./ItemImage');
class Item extends bookshelf.Model {
  get tableName() {
    return 'items';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }

  conditions() {
    return this.belongsTo('ItemCondition', 'condition_id');
  }

  categories() {
    return this.belongsTo('Category', 'category_id');
  }

  subCategories() {
    return this.belongsTo('SubCategory', 'subCategory_id');
  }

  orders() {
    return this.hasMany('Order', 'item_id');
  }

  images() {
    return this.hasMany('ItemImage', 'item_id');
  }
}

module.exports = bookshelf.model('Item', Item);
