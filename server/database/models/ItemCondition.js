const bookshelf = require('../bookshelf');

require('./Item');
class ItemCondition extends bookshelf.Model {
  get tableName() {
    return 'itemConditions';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item');
  }
}

module.exports = bookshelf.model('ItemCondition', ItemCondition);
