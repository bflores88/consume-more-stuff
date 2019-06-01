const bookshelf = require('../bookshelf');

require('./SubCategory');
require('./Item');
class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }

  subCategories() {
    return this.hasMany('SubCategory', 'category_id');
  }

  items() {
    return this.hasMany('Item', 'category_id');
  }
}

module.exports = bookshelf.model('Category', Category);
