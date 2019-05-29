const bookshelf = require('../bookshelf');

require('./Category');
require('./Item');
class SubCategory extends bookshelf.Model {
  get tableName() {
    return 'subCategories';
  }
  get hasTimestamps() {
    return true;
  }
  category_id() {
    return this.belongsTo('Category', 'category_id');
  }
  items() {
    return this.hasMany('Item');
  }
}

module.exports = bookshelf.model('SubCategory', SubCategory);
