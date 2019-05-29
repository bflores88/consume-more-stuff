const bookshelf = require('../bookshelf');

require('./Item');
class ItemStatus extends bookshelf.Model {
  get tableName() {
    return 'itemStatuses';
  }
  get hasTimestamps() {
    return true;
  }

  Items() {
    return this.hasMany('Item');
  }
}

module.exports = bookshelf.model('ItemStatus', ItemStatus);
