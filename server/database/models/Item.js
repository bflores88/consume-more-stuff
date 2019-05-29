const bookshelf = require('../bookshelf');

require('./User');
require('./ItemStatus');
require('./Category');
require('./ItemCondition');
require('./SubCategory');
class Item extends bookshelf.Model {
  get tableName() {
    return 'items';
  }
  get hasTimestamps() {
    return true;
  }

  user_id() {
    return this.belongsTo('User', 'user_id');
  }

  condition_id() {
    return this.belongsTo('ItemCondition', 'condition_id');
  }
  status_id() {
    return this.belongsTo('ItemStatus', 'status_id');
  }
  category_id() {
    return this.belongsTo('Category', 'category_id');
  }
  subCategory_id() {
    return this.belongsTo('SubCategory', 'subCategory_id');
  }
}

module.exports = bookshelf.model('Item', Item);
