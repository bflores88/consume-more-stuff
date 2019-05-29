const bookshelf = require('../bookshelf');

require('./Theme');
require('./Role');
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  role_id() {
    return this.belongsTo('Role', 'role_id');
  }

  theme_id() {
    return this.belongsTo('Theme', 'theme_id');
  }
}

module.exports = bookshelf.model('User', User);
