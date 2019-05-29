const bookshelf = require('../bookshelf');

require('./User');
class Theme extends bookshelf.Model {
  get tableName() {
    return 'themes';
  }
  get hasTimestamps() {
    return true;
  }

  Users() {
    return this.hasMany('User');
  }
}

module.exports = bookshelf.model('Theme', Theme);
