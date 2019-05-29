const bookshelf = require('../bookshelf');

require('./User');
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
}

module.exports = bookshelf.model('SubCategory', SubCategory);
