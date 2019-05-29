const bookshelf = require('../bookshelf');

require('./Item');
class ItemCondition extends bookshelf.Model {
  get tableName() {
    return 'itemConditions';
  }
  get hasTimestamps() {
    return true;
  }

  Items() {
    return this.hasMany('Item');
  }
}

module.exports = bookshelf.model('ItemCondition', ItemCondition);
