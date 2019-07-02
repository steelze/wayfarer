export default class QueryBuilder {
  static create(table, data) {
    const user = {
      id: (table.length + 1),
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      is_admin: 0,
      password: data.password,
      created_at: Date.now(),
    };
    table.push(user);
    console.log(table);
    return user;
  }
}
