const bookshelf = require('../bookshelf');

require('./SubCategory');
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
}

module.exports = bookshelf.model('Category', Category);
