const bookshelf = require('../bookshelf');

require('./Item');

class ItemImage extends bookshelf.Model {
  get tableName() {
    return 'itemImages';
  }
  get hasTimestamps() {
    return true;
  }

  item_id() {
    return this.belongsTo('Item', 'item_id');
  }
}

module.exports = bookshelf.model('ItemImage', ItemImage);
