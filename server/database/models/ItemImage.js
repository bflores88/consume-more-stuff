const bookshelf = require('../bookshelf');

require('./Item');

class ItemImage extends bookshelf.Model {
  get tableName() {
    return 'item_images';
  }
  get hasTimestamps() {
    return true;
  }

  items() {
    return this.belongsTo('Item', 'item_id');
  }
}

module.exports = bookshelf.model('ItemImage', ItemImage);
