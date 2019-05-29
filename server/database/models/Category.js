const bookshelf = require('../bookshelf');

require('./SubCategory');
class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }
  Subcategories() {
    return this.hasMany('Subcategory');
  }
}

module.exports = bookshelf.model('Category', Category);
