const bookshelf = require('../bookshelf');

require('./User');
class Role extends bookshelf.Model {
  get tableName() {
    return 'roles';
  }
  get hasTimestamps() {
    return true;
  }

  Users() {
    return this.hasMany('User');
  }
}

module.exports = bookshelf.model('Role', Role);
