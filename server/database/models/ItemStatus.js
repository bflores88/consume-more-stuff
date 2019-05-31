const bookshelf = require('../bookshelf');

require('./Item');
class ItemStatus extends bookshelf.Model {
  get tableName() {
    return 'itemStatuses';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.hasMany('Item', 'status_id');
  }
}

module.exports = bookshelf.model('ItemStatus', ItemStatus);
