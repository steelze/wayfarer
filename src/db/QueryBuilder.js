import Pool from './config';

export default class QueryBuilder {
  static exists(table, data) {
    let text = `SELECT 1 FROM  ${table} WHERE `;
    const values = [];
    const entries = Object.entries(data);
    entries.forEach((entry, index) => {
      const counter = index + 1;
      const [key, value] = entry;
      text += `${key} = $${counter} AND `;
      values.push(value);
    });
    text = text.replace(/ AND \s*$/, '');
    text += ' LIMIT 1';
    return Pool.query(text, values);
  }

  static insert(table, data) {
    let text = `INSERT INTO ${table}(`;
    const values = [];
    const placeholders = [];
    const entries = Object.entries(data);
    entries.forEach((entry, index) => {
      const counter = index + 1;
      const [key, value] = entry;
      text += `${key}, `;
      values.push(value);
      placeholders.push(`$${counter}`);
    });
    text = text.replace(/,\s*$/, '');
    text += `) VALUES (${placeholders}) RETURNING *`;
    return Pool.query(text, values);
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

  static truncate(table) {
    if (!table) return false;
    const text = `TRUNCATE ${table} RESTART IDENTITY`;
    return Pool.query(text);
  }

  static schema(table) {
    if (!table) return false;
    this.query = `CREATE TABLE IF NOT EXISTS ${table}`;
    return this;
  }

  static select(table, data) {
    const values = [];
    let text = `SELECT * FROM  ${table}`;
    if (data) {
      text += ' WHERE ';
      const entries = Object.entries(data);
      entries.forEach((entry, index) => {
        const counter = index + 1;
        const [key, value] = entry;
        text += `${key} = $${counter} AND `;
        values.push(value);
      });
      text = text.replace(/ AND \s*$/, '');
    }
    return Pool.query(text, values);
  }

  static delete(table, data) {
    const values = [];
    let text = `DELETE FROM  ${table}`;
    if (data) {
      text += ' WHERE ';
      const entries = Object.entries(data);
      entries.forEach((entry, index) => {
        const counter = index + 1;
        const [key, value] = entry;
        text += `${key} = $${counter} AND `;
        values.push(value);
      });
      text = text.replace(/ AND \s*$/, '');
    }
    return Pool.query(text, values);
  }

  static update(table, data, params) {
    const values = [];
    let counter = 0;
    let text = `UPDATE ${table}`;
    text += ' SET ';
    const entries = Object.entries(data);
    entries.forEach((entry) => {
      counter += 1;
      const [key, value] = entry;
      text += `${key} = $${counter}, `;
      values.push(value);
    });
    text = text.replace(/, \s*$/, '');
    if (params) {
      text += ' WHERE ';
      const options = Object.entries(params);
      options.forEach((option) => {
        counter += 1;
        const [key, value] = option;
        text += `${key} = $${counter} AND `;
        values.push(value);
      });
      text = text.replace(/ AND \s*$/, '');
    }
    return Pool.query(text, values);
  }

  static raw(query, values) {
    return Pool.query(query, values);
  }
}
