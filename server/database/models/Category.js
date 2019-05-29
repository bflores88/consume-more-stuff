const bookshelf = require('../bookshelf');

require('./User');
class Category extends bookshelf.Model {
  get tableName() {
    return 'categories';
  }
  get hasTimestamps() {
    return true;
  }
}

module.exports = bookshelf.model('Category', Category);
