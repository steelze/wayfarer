import UserSeed from '../db/seeds/users';
import QueryBuilder from '../db/QueryBuilder';

const TABLE = 'users';

export default class User extends QueryBuilder {
  static exists(data) {
    return UserSeed.find(user => user.email === data.email);
  }

  static create(data) {
    return super.insert(UserSeed, data);
  }

  static isAdmin(id) {
    if (!id) return false;
    return UserSeed.find(user => user.id === id && user.is_admin === 1);
  }
}
