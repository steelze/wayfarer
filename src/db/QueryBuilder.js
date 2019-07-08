import Pool from './config';

export default class QueryBuilder {
  static insert(table, data) {
    const user = {
      id: (table.length + 1),
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      is_admin: 0,
      password: data.hashedPassword,
      created_at: Date.now(),
    };
    table.push(user);
    return user;
  }

  static create(props) {
    this.query += '(';
    const entries = Object.entries(props);
    entries.forEach((entry) => {
      const [key, value] = entry;
      this.query += `${key} ${value}, `;
    });
    // https://stackoverflow.com/questions/17720264/remove-last-comma-from-a-string
    this.query = this.query.replace(/,\s*$/, '');
    this.query += ')';
    Pool.query(this.query);
  }

  static schema(table) {
    if (!table) return false;
    this.query = `CREATE TABLE IF NOT EXISTS ${table}`;
    return this;
  }
}
