const bookshelf = require('../bookshelf');

require('./User');
class Theme extends bookshelf.Model {
  get tableName() {
    return 'themes';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.hasMany('User', 'theme_id');
  }
}

module.exports = bookshelf.model('Theme', Theme);
